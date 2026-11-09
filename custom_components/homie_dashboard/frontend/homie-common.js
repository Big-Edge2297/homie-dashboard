/* ═══════════════════════════════════════════════════════════════════════════
 * Homie Dashboard — shared helpers (used by the dashboard and the setup wizard)
 * Pure functions only. No side effects.
 * ═══════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var ICON_PREFIX = "@icon:";   // "@icon:scenes.relax"  ->  ICONS.scenes.relax
  var INF         = "@inf";     // JSON cannot store Infinity (used by AQI bands)
  var ICON_MARK   = "__homieIconPath";

  function isPlain(v) { return v !== null && typeof v === "object" && !Array.isArray(v); }
  function clone(v)   { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }

  /* Objects merge recursively, arrays and scalars are replaced by the override. */
  function deepMerge(base, over) {
    if (over === undefined) return clone(base);
    if (!isPlain(base) || !isPlain(over)) return clone(over);
    var out = {};
    Object.keys(base).forEach(function (k) { out[k] = clone(base[k]); });
    Object.keys(over).forEach(function (k) {
      out[k] = (k in base) ? deepMerge(base[k], over[k]) : clone(over[k]);
    });
    return out;
  }

  /* Replace "@icon:" and "@inf" markers with real values. */
  function resolve(v, ICONS) {
    if (typeof v === "string") {
      if (v === INF) return Infinity;
      if (v.indexOf(ICON_PREFIX) === 0) {
        var node = ICONS || {};
        v.slice(ICON_PREFIX.length).split(".").forEach(function (p) { node = node && node[p]; });
        return typeof node === "string" ? node : "";
      }
      return v;
    }
    if (Array.isArray(v)) return v.map(function (x) { return resolve(x, ICONS); });
    if (isPlain(v)) {
      var o = {};
      Object.keys(v).forEach(function (k) { o[k] = resolve(v[k], ICONS); });
      return o;
    }
    return v;
  }

  /* Turn a live JS config object (from an old config.js) into plain JSON data. */
  function serialize(v) {
    if (typeof v === "function") { var p = v[ICON_MARK]; return p ? ICON_PREFIX + p : undefined; }
    if (typeof v === "number" && !isFinite(v)) return v > 0 ? INF : undefined;
    if (Array.isArray(v)) return v.map(serialize).filter(function (x) { return x !== undefined; });
    if (v && typeof v === "object") {
      var o = {};
      Object.keys(v).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(v, k);
        if (d && d.get) return;                 // skip getters (e.g. welcomeText)
        var s = serialize(v[k]);
        if (s !== undefined) o[k] = s;
      });
      return o;
    }
    return v;
  }

  /* A stand-in for the dashboard's ICONS object that records which icon was used. */
  function makeIconProxy() {
    function make(path) {
      return new Proxy(function () {}, {
        get: function (_, prop) {
          if (prop === ICON_MARK) return path;
          if (typeof prop === "symbol") return undefined;
          return make(path ? path + "." + prop : prop);
        }
      });
    }
    return make("");
  }

  var PLACEHOLDER = /^YOUR_/;
  var ENTITYISH   = /^[a-z_]+\.[A-Za-z0-9_]+$/;
  var CONTAINERS  = ["subGroups", "subEntities", "scenes", "sensors", "rooms", "entities"];

  /* Remove every "YOUR_…" placeholder from a config tree. */
  function sanitize(v) {
    if (Array.isArray(v)) {
      var out = [];
      v.forEach(function (it) {
        if (typeof it === "string") { if (!PLACEHOLDER.test(it)) out.push(it); return; }
        var s = sanitize(it);
        if (s === undefined) return;
        if (isPlain(it)) {
          var keys = Object.keys(it).filter(function (k) {
            return typeof it[k] === "string" && (PLACEHOLDER.test(it[k]) || ENTITYISH.test(it[k]));
          });
          if (keys.length && keys.every(function (k) { return s[k] === ""; })) return;  // all entities were placeholders
        }
        out.push(s);
      });
      return out;
    }
    if (isPlain(v)) {
      var o = {}, hadContent = false, hasContent = false;
      Object.keys(v).forEach(function (k) {
        var x = v[k];
        if (PLACEHOLDER.test(k)) return;                          // placeholder map keys
        if (typeof x === "string" && PLACEHOLDER.test(x)) { o[k] = ""; return; }
        o[k] = sanitize(x);
      });
      CONTAINERS.forEach(function (k) {
        if (Array.isArray(v[k]) && v[k].length) { hadContent = true; if (o[k] && o[k].length) hasContent = true; }
      });
      if (hadContent && !hasContent) return undefined;            // e.g. a control group with no real entities
      return o;
    }
    return v;
  }

  root.HomieCommon = {
    ICON_PREFIX: ICON_PREFIX, INF: INF, ICON_MARK: ICON_MARK,
    isPlain: isPlain, clone: clone, deepMerge: deepMerge, resolve: resolve,
    serialize: serialize, makeIconProxy: makeIconProxy, sanitize: sanitize
  };
})(typeof window !== "undefined" ? window : globalThis);
