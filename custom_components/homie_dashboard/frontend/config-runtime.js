/* ═══════════════════════════════════════════════════════════════════════════
 * Homie Dashboard — runtime configuration (v5)
 *
 * Replaces the old config.js. Nothing is stored in this file:
 *   • the access token comes from your logged-in Home Assistant session
 *   • entities and preferences come from the Setup wizard (stored in HA)
 * It defines the same globals the dashboard has always used:
 *   HA_TOKEN, WS_URL, BASE, ALARM_ENTITY, PHOTO_FRAME_IMAGES,
 *   PHOTO_FRAME_INTERVAL, BACKGROUND_IMAGES, CONFIG
 * plus ALARM_CODE_STORED (true/false) and homiePhotoUrl(). The alarm code itself is
 * never sent to the browser: Home Assistant adds it when the dashboard arms/disarms.
 * ═══════════════════════════════════════════════════════════════════════════ */
var _homieBridge = null;
try { _homieBridge = (window.parent && window.parent !== window) ? window.parent.homieBridge : null; } catch (e) { _homieBridge = null; }

/* Short-lived session token, refreshed in the background (HA tokens last 30 min). */
let HA_TOKEN = _homieBridge ? (_homieBridge.token || "") : "";
window.homieRefreshToken = function () {
  if (!_homieBridge) return Promise.resolve();
  return _homieBridge.getToken().then(function (t) { HA_TOKEN = t; }).catch(function (e) { console.warn("[Homie] token refresh failed", e); });
};
if (_homieBridge) setInterval(window.homieRefreshToken, 5 * 60 * 1000);

/* Connection — always the Home Assistant this page is served from. */
const WS_URL = location.origin.replace(/^http/, "ws") + "/api/websocket";
const BASE   = location.origin;

/* Wizard output layered over the built-in defaults. */
var _homieStored   = (_homieBridge && _homieBridge.config)   || {};
var _homieSettings = (_homieBridge && _homieBridge.settings) || {};
var _homiePhotos   = (_homieBridge && _homieBridge.photos)   || { frame: [], background: [] };

/* Photos are served by an authenticated endpoint and handed out as time-limited signed URLs.
 * The arrays hold stable paths (so saved choices keep working); homiePhotoUrl() turns a
 * path into its current signed URL. */
var _homieSigned = {};
function _homiePaths(list) {
  return (list || []).map(function (p) { _homieSigned[p.path] = p.url; return p.path; });
}
function homiePhotoUrl(path) { return _homieSigned[path] || path; }
var _homieCfg = HomieCommon.resolve(HomieCommon.deepMerge(window.HOMIE_DEFAULTS || {}, _homieStored), typeof ICONS !== "undefined" ? ICONS : {});

const ALARM_CODE_STORED    = !!_homieSettings.alarmCodeUsable;   // a saved code exists AND this user may use it
const ALARM_ENTITY         = _homieCfg.alarmEntity || "";
const PHOTO_FRAME_IMAGES   = _homiePaths(_homiePhotos.frame);
const PHOTO_FRAME_INTERVAL = Number(_homieSettings.photoFrameInterval) || 20;
const BACKGROUND_IMAGES    = _homiePaths(_homiePhotos.background);

/* Keep signed URLs fresh on displays that stay on for days (URLs are valid for 12 h). */
function _homieSyncList(target, items) {
  var paths = _homiePaths(items);
  var changed = paths.length !== target.length || paths.some(function (p, i) { return target.indexOf(p) < 0; });
  if (changed) { target.length = 0; Array.prototype.push.apply(target, paths); }
}
if (_homieBridge) {
  setInterval(function () {
    _homieBridge.refreshPhotos().then(function () {
      var ph = _homieBridge.photos || {};
      _homieSyncList(PHOTO_FRAME_IMAGES, ph.frame);
      _homieSyncList(BACKGROUND_IMAGES, ph.background);
    }).catch(function (e) { console.warn("[Homie] photo refresh failed", e); });
  }, 3 * 60 * 60 * 1000);
}

const CONFIG = Object.assign({}, _homieCfg, { wsUrl: WS_URL, alarmEntity: ALARM_ENTITY });
if (!CONFIG.sun) CONFIG.sun = {};
if (!CONFIG.sun.timezone) {
  try { CONFIG.sun.timezone = (_homieBridge && _homieBridge.timeZone) || Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { CONFIG.sun.timezone = "UTC"; }
}
Object.defineProperty(CONFIG, "welcomeText", {
  enumerable: true,
  get: function () {
    var h = new Date().getHours(), slots = this.greetingSlots;
    for (var i = slots.length - 1; i >= 0; i--) { if (h >= slots[i].from) return slots[i].label; }
    return slots[slots.length - 1].label;
  }
});

/* Opened directly instead of from the Home Assistant sidebar? Explain instead of failing silently. */
if (!_homieBridge) {
  document.addEventListener("DOMContentLoaded", function () {
    var d = document.createElement("div");
    d.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#0b0b0d;color:#eee;display:flex;align-items:center;justify-content:center;text-align:center;padding:32px;font:16px/1.5 system-ui,sans-serif";
    d.innerHTML = "<div><h2 style='margin:0 0 12px'>Open Homie Dashboard from Home Assistant</h2>" +
      "<p style='opacity:.75;max-width:460px'>This page signs in through your Home Assistant session. " +
      "Open <b>Homie</b> from the Home Assistant sidebar instead of loading this address directly.</p></div>";
    document.body.appendChild(d);
  });
}
