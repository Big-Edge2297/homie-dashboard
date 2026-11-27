/* Homie Dashboard: Car dashboard (BMW CarData and similar). Sensors are chosen in the Setup wizard (Car step). */
(function () {
  "use strict";
  var OPEN = /^(open|opened|on|true|tilted|intermediate|ajar)$/i, BADV = /^(unavailable|unknown|none)?$/i;
  var DOORS = [["doorFD", "Driver"], ["doorFP", "Passenger"], ["doorRD", "Rear driver"], ["doorRP", "Rear pass."]];
  var WINS  = [["winFD", "Driver"], ["winFP", "Passenger"], ["winRD", "Rear driver"], ["winRP", "Rear pass."]];
  var TYRES = [["tyreFL", "tgtFL", "fl", "Front L", "Front left"], ["tyreFR", "tgtFR", "fr", "Front R", "Front right"], ["tyreRL", "tgtRL", "rl", "Rear L", "Rear left"], ["tyreRR", "tgtRR", "rr", "Rear R", "Rear right"]];
  var SERVICE = [["svcService", "Service"], ["svcOil", "Engine oil"], ["svcBrake", "Brake fluid"], ["svcCheck", "Vehicle check"]];
  var ACTLBL = { doorFD: "Driver door", doorFP: "Passenger door", doorRD: "Rear driver door", doorRP: "Rear passenger door", winFD: "Driver window", winFP: "Passenger window", winRD: "Rear driver window", winRP: "Rear passenger window", hood: "Hood", tailgate: "Tailgate", lock: "Doors", alarm: "Alarm", motion: "Vehicle motion" };
  var CHK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';

  var cfg = function () { return (typeof CONFIG !== "undefined" && CONFIG.car) || null; };
  var slot = function (k) { var c = cfg(); return (c && c.sensors && c.sensors[k]) || ""; };
  var obj = function (k) { var e = slot(k); return e ? haGetCached(e) : null; };
  var sv = function (k) { var s = obj(k); return s && !BADV.test(String(s.state)) ? String(s.state) : null; };
  var num = function (k) { var v = parseFloat(sv(k)); return isFinite(v) ? v : null; };
  var unit = function (k, d) { var s = obj(k); return (s && s.attributes && s.attributes.unit_of_measurement) || d || ""; };
  var actHours = function () { var h = parseFloat((cfg() || {}).activityHours); return isFinite(h) && h >= 1 ? Math.min(168, h) : 48; };
  var bmw = function () { var c = cfg(); return !c || c.bmwStyle !== false; };
  var acc = function () { return bmw() ? "#0066B1" : "#3b6a85"; };   // BMW M blue, or a neutral steel blue
  var E = function (s) { return escapeHtml(String(s)); };
  var fmt = function (n, d) { return n.toLocaleString(undefined, { maximumFractionDigits: d || 0 }); };
  var good = function (t) { return '<span class="cr-ok">' + E(t) + "</span>"; };
  var neu  = function (t) { return '<span class="cr-neu">' + E(t) + "</span>"; };
  var warn = function (t) { return '<span class="cr-warn"><i></i>' + E(t) + "</span>"; };
  var bad  = function (t) { return '<span class="cr-bad"><i></i>' + E(t) + "</span>"; };
  var row  = function (a, b) { return '<div class="cr-row"><span>' + E(a) + "</span>" + b + "</div>"; };

  window._carConfigured = function () { var c = cfg(); return !!(c && c.sensors && Object.keys(c.sensors).some(function (k) { return c.sensors[k]; })); };

  /* ---- status helpers ---- */
  function openGroup(list) {
    var set = list.filter(function (x) { return slot(x[0]); });
    if (!set.length) return null;
    var known = set.filter(function (x) { return sv(x[0]) !== null; });
    if (!known.length) return neu("Unknown");
    var open = known.filter(function (x) { return OPEN.test(sv(x[0])); });
    if (!open.length) return good("All closed");
    if (open.length === set.length) return warn("All open");
    return open.length === 1 ? warn("Open \u00b7 " + open[0][1]) : warn(open.length + " open");
  }
  /* OK / not-OK status. A binary sensor reads "off" when everything is fine (Home Assistant shows "OK"). */
  function okInfo(k, onLabel) {
    var s = obj(k); if (!s) return null;
    var v = String(s.state); if (BADV.test(v)) return { ok: false, unknown: true, txt: "\u2014" };
    if (slot(k).split(".")[0] === "binary_sensor") { var on = /^(on|true)$/i.test(v); return { ok: !on, txt: on ? (onLabel || "Due") : "OK" }; }
    var ok = /^(ok|good)$/i.test(v); return { ok: ok, txt: ok ? "OK" : v.toUpperCase() };
  }
  function single(k) { var v = sv(k); return v === null ? null : (OPEN.test(v) ? warn("Open") : good("Closed")); }
  function lockHtml() { var v = sv("lock"); if (v === null) return null; return /unlock/i.test(v) ? warn("Unlocked") : /lock|secure/i.test(v) ? good("Locked") : neu(v); }
  function alarmHtml() {
    var act = sv("alarmActive"); if (act !== null && /^(on|true|triggered|active)$/i.test(act)) return bad("Triggered");
    var v = sv("alarm"); if (v === null) return null;
    return /^(unarmed|disarmed|off)$/i.test(v) ? neu("Not armed") : /arm/i.test(v) ? good("Armed") : neu(v);
  }
  function tyre(i) {
    var t = TYRES[i], v = num(t[0]); if (v === null) return null;
    var c = cfg(), th = c.tyres || {}, tg = num(t[1]);
    if (tg === null && th.manual && th.manual[t[2]] !== "" && th.manual[t[2]] != null) { var m = parseFloat(th.manual[t[2]]); tg = isFinite(m) ? m : null; }
    var d = tg === null ? 0 : v - tg, a = Math.abs(d), w = +th.warn || 10, al = +th.alert || 30;
    return { v: v, tg: tg, d: d, lvl: tg === null ? 0 : a >= al ? 2 : a >= w ? 1 : 0, unit: unit(t[0], "kPa"), s: t[3], l: t[4] };
  }
  function homeLL() {
    var c = cfg(), h = c.home || {}, lat = parseFloat(h.lat), lon = parseFloat(h.lon);
    if (!isFinite(lat) || !isFinite(lon)) { try { var hc = window._homieBridge && window._homieBridge.hass().config; lat = hc.latitude; lon = hc.longitude; } catch (e) {} }
    return isFinite(lat) && isFinite(lon) ? [lat, lon] : null;
  }
  function carLL() {
    var lat = num("lat"), lon = num("lon");
    if (lat === null || lon === null) { var t = obj("tracker"); if (t && t.attributes && isFinite(t.attributes.latitude)) { lat = +t.attributes.latitude; lon = +t.attributes.longitude; } }
    return lat !== null && lon !== null ? [lat, lon] : null;
  }
  var rad = function (x) { return x * Math.PI / 180; };
  function geo() {
    var c = carLL(), h = homeLL(); if (!c) return null;
    var out = { lat: c[0], lon: c[1], dist: null, bearing: null };
    if (h) {
      var dLat = rad(c[0] - h[0]), dLon = rad(c[1] - h[1]);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(h[0])) * Math.cos(rad(c[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      out.dist = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      out.bearing = (Math.atan2(Math.sin(dLon) * Math.cos(rad(c[0])), Math.cos(rad(h[0])) * Math.sin(rad(c[0])) - Math.sin(rad(h[0])) * Math.cos(rad(c[0])) * Math.cos(dLon)) * 180 / Math.PI + 360) % 360;
    }
    return out;
  }
  var distTxt = function (km) { return km < 1 ? Math.round(km * 1000) + " m" : fmt(km, km < 10 ? 1 : 0) + " km"; };
  var llTxt = function (g) { return Math.abs(g.lat).toFixed(4) + "\u00b0 " + (g.lat >= 0 ? "N" : "S") + " \u00b7 " + Math.abs(g.lon).toFixed(4) + "\u00b0 " + (g.lon >= 0 ? "E" : "W"); };
  function whereTxt(g) {
    var tr = sv("tracker");
    if (tr && /^home$/i.test(tr)) return "Home";
    if (!g) return tr ? tr : "Unknown";
    return g.dist !== null && g.dist < 0.15 ? "Home" : "Away";
  }
  function radar(g) {
    var rings = '<circle cx="100" cy="100" r="90" fill="rgba(255,255,255,.28)" stroke="rgba(20,32,42,.18)"/><circle cx="100" cy="100" r="60" fill="none" stroke="rgba(20,32,42,.14)"/><circle cx="100" cy="100" r="30" fill="none" stroke="rgba(20,32,42,.12)"/><path d="M100 10v180M10 100h180" stroke="rgba(20,32,42,.08)"/><text x="100" y="9" text-anchor="middle" font-size="11" font-weight="600" fill="#364852">N</text>';
    var home = '<path d="M92 104l8-8 8 8v8H92z" fill="#14202a"/>';
    if (!g || g.dist === null) return '<svg viewBox="0 0 200 200" class="cr-rd" aria-hidden="true">' + rings + home + "</svg>";
    var steps = [1, 5, 25, 100, 500, 2000, 10000], max = steps.filter(function (s) { return s >= g.dist; })[0] || 20000;
    var r = Math.min(90, 90 * Math.log(1 + g.dist) / Math.log(1 + max)), th = rad(g.bearing);
    var x = 100 + r * Math.sin(th), y = 100 - r * Math.cos(th), hd = num("heading");
    var arrow = hd !== null ? '<path d="M0 -13l5 9h-10z" fill="' + acc() + '" transform="translate(' + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + hd + ')"/>' : "";
    return '<svg viewBox="0 0 200 200" class="cr-rd" aria-hidden="true">' + rings + '<text x="195" y="94" text-anchor="end" font-size="10" fill="#364852">' + E(distTxt(max)) + "</text>" + home +
      '<line x1="100" y1="100" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="' + acc() + '" stroke-width="1.5" stroke-dasharray="2 4"/>' + arrow +
      '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="6" fill="' + acc() + '" stroke="#fff" stroke-width="2.5"/></svg>';
  }
  function ago(k) {
    var s = obj(k); if (!s || BADV.test(String(s.state))) return null;
    var t = Date.parse(s.state); if (!isFinite(t)) t = Date.parse(s.last_changed);
    if (!isFinite(t)) return null;
    var m = Math.max(0, Math.round((Date.now() - t) / 60000));
    return m < 1 ? "just now" : m < 60 ? m + " min ago" : m < 1440 ? Math.round(m / 60) + " h ago" : Math.round(m / 1440) + " d ago";
  }
  function connHtml() {
    var p = [], st = sv("stream"), u = ago("lastMessage"), tc = ago("lastTelematics");
    if (st) p.push('<span><span class="cr-dot' + (/^connected$/i.test(st) ? "" : " w") + '"></span>Stream ' + E(st.toLowerCase()) + "</span>");
    if (u) p.push("<span>Updated " + E(u) + "</span>");
    if (tc) p.push("<span>Telematics call " + E(tc) + "</span>");
    return p.join("<span>\u00b7</span>");
  }

  /* ---- activity (Home Assistant logbook) ---- */
  var _act = [], _actAt = 0;
  function loadAct() {
    var map = {}, ids = [];
    Object.keys(ACTLBL).forEach(function (k) { var e = slot(k); if (e) { map[e] = k; ids.push(e); } });
    if (!ids.length || typeof _ws === "undefined" || !_ws || _ws.readyState !== 1) return;
    _actAt = Date.now();
    var id = _wsNextId(), end = new Date(), start = new Date(end.getTime() - actHours() * 3600000), to;
    var h = function (ev) {
      var m; try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (m.id !== id) return;
      _ws.removeEventListener("message", h); clearTimeout(to);
      if (!m.success || !Array.isArray(m.result)) return;
      _act = m.result.filter(function (x) { return map[x.entity_id] && x.state && !BADV.test(String(x.state)); }).map(function (x) {
        return { key: map[x.entity_id], state: String(x.state), t: x.when > 1e11 ? x.when : x.when * 1000 };
      }).sort(function (a, b) { return b.t - a.t; }).slice(0, 50);
      if (_open) render();
    };
    to = setTimeout(function () { _ws.removeEventListener("message", h); }, 10000);
    _ws.addEventListener("message", h);
    _ws.send(JSON.stringify({ id: id, type: "logbook/get_events", start_time: start.toISOString(), end_time: end.toISOString(), entity_ids: ids }));
  }
  function whenTxt(t) {
    var d = new Date(t), n = new Date(), tm = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    var day = d.toDateString() === n.toDateString() ? "Today" : d.toDateString() === new Date(n - 86400000).toDateString() ? "Yesterday" : d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
    return day + ", " + tm;
  }
  var cap = function (v) { v = String(v); return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(); };
  /* Turn a raw logbook value (on/off, unarmed, UNLOCKED ...) into the words used everywhere else on the dashboard. */
  function actWord(k, v) {
    v = String(v);
    var e = slot(k), dom = e.split(".")[0];
    if (k === "motion") return /^(on|true|moving|driving)$/i.test(v) ? "Moving" : /^(off|false|not moving|stopped|parked|idle)$/i.test(v) ? "Not moving" : cap(v);
    if (k === "lock") { if (dom === "binary_sensor") return /^(on|true)$/i.test(v) ? "Unlocked" : "Locked"; return /unlock/i.test(v) ? "Unlocked" : /lock|secure/i.test(v) ? "Locked" : cap(v); }
    if (k === "alarm") return /trigger|^(on|true)$/i.test(v) ? "Triggered" : /^(unarmed|disarmed|off)$/i.test(v) ? "Not armed" : /arm/i.test(v) ? "Armed" : cap(v);
    if (/^intermediate$/i.test(v)) return "Partly open";
    if (/^tilted$/i.test(v)) return "Tilted";
    if (OPEN.test(v)) return "Open";
    if (/^(off|false|closed|close)$/i.test(v)) return "Closed";
    return cap(v);
  }
  function actHtml() {
    if (!_act.length) return '<div class="cr-none">No recent activity</div>';
    return _act.map(function (a) {
      var s = actWord(a.key, a.state), w = /^(open|partly open|tilted|unlocked|triggered)$/i.test(s);
      return '<div class="cr-act-row"><span class="t"><i class="d' + (w ? " w" : "") + '"></i><span><div>' + E(ACTLBL[a.key]) + "</div><span>" + E(whenTxt(a.t)) + "</span></span></span><b>" + E(s) + "</b></div>";
    }).join("");
  }

  /* ---- pieces ---- */
  function ring(p, col) {
    var d = Math.max(0, Math.min(100, p)) * 3.39;
    return '<div style="position:relative;width:128px;height:128px;flex:none"><svg width="128" height="128" viewBox="0 0 132 132" aria-hidden="true"><circle cx="66" cy="66" r="54" fill="none" stroke="rgba(20,32,42,.14)" stroke-width="12"/><circle cx="66" cy="66" r="54" fill="none" stroke="' + col + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + d.toFixed(0) + ' 339" transform="rotate(-90 66 66)"/></svg><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><span class="cr-n" style="font-size:2rem;' + (col === "#d11a2a" ? "color:#b3121f" : "") + '">' + fmt(p) + '%</span><span class="cr-l" style="font-size:.6rem;margin-top:4px">of tank</span></div></div>';
  }
  function carImg() {
    var list = typeof CAR_IMAGES !== "undefined" ? CAR_IMAGES : [];
    if (list.length) return '<img alt="' + E((cfg().name || "Car")) + '" src="' + E(homiePhotoUrl(list[0])) + '">';
    return '<svg class="cr-gen" viewBox="0 0 400 140" aria-hidden="true"><path d="M20 104c0-22 40-32 80-40l50-24c20-8 80-8 105 0l55 24c40 6 70 18 70 40v8H20z" fill="rgba(20,32,42,.2)"/><circle cx="105" cy="112" r="22" fill="rgba(20,32,42,.45)"/><circle cx="295" cy="112" r="22" fill="rgba(20,32,42,.45)"/></svg><div class="cr-hint">Add a transparent PNG of your car to /config/homie_dashboard/car/ to show it here.</div>';
  }
  function secRows() {
    var r = [], add = function (a, b) { if (b) r.push(row(a, b)); };
    add("Lock", lockHtml()); add("Alarm", alarmHtml()); add("Doors", openGroup(DOORS)); add("Windows", openGroup(WINS)); add("Hood", single("hood")); add("Tailgate", single("tailgate"));
    return r.join("");
  }
  function fuelCard() {
    var p = num("fuel"), rg = num("range"); if (p === null && rg === null) return "";
    var col = p !== null && p < 10 ? "#d11a2a" : acc();
    return '<div class="cr-c"><div class="cr-l">Fuel</div><div class="cr-row" style="margin-top:12px">' + (p !== null ? ring(p, col) : "") + "<div>" + (rg !== null ? '<div class="cr-n">' + fmt(rg) + "<small>" + E(unit("range", "km")) + '</small></div><div class="cr-s">estimated range</div>' : "") + "</div></div></div>";
  }
  function mileCard() { var m = num("mileage"); return m === null ? "" : '<div class="cr-c"><div class="cr-l">Mileage</div><div class="cr-n" style="margin-top:10px">' + fmt(m) + "<small>" + E(unit("mileage", "km")) + "</small></div></div>"; }
  function chips() {
    var c = SERVICE.filter(function (s) { return slot(s[0]); }).map(function (s) {
      var o = okInfo(s[0]);
      return '<div class="cr-chip"><span class="cr-l" style="font-size:.62rem">' + E(s[1]) + "</span><b" + (o.ok ? "" : ' class="w"') + ">" + E(o.txt) + "</b></div>";
    });
    return c.length ? '<div style="width:100%"><div class="cr-l" style="margin-bottom:10px">Service status</div><div class="cr-chips">' + c.join("") + "</div></div>" : "";
  }
  function tyreMini() {
    var cells = TYRES.map(function (t, i) { var y = tyre(i); if (!y) return ""; return '<div><span class="cr-s">' + E(y.s) + '</span><div class="cr-n lv' + y.lvl + '" style="font-size:1.8rem">' + fmt(y.v) + (y.lvl ? "<small class=\"lv" + y.lvl + '">' + (y.d > 0 ? "+" : "\u2212") + fmt(Math.abs(y.d)) + "</small>" : "") + "</div></div>"; }).join("");
    var di = okInfo("tyreDiag", "Problem"), dl = di && !di.unknown ? '<div class="cr-diag">' + (di.ok ? '<span class="cr-ok" style="display:inline-flex;align-items:center;gap:6px">' + CHK + " Tyre diagnosis OK</span>" : warn("Tyre diagnosis: " + di.txt)) + "</div>" : "";
    return cells ? '<div class="cr-c"><div class="cr-l">Tyre pressure \u00b7 ' + E(unit("tyreFL", "kPa")) + '</div><div class="cr-tyres">' + cells + "</div>" + dl + "</div>" : "";
  }
  function locCard(big) {
    var g = geo(), where = whereTxt(g); if (!g && !sv("tracker")) return "";
    return '<div class="cr-c cr-loc cr-flex"><div class="cr-l">Location</div><div class="cr-rdw">' + radar(g) + '</div><div style="text-align:center">' + (g && g.dist !== null ? '<div class="cr-s" style="font-size:.95rem"><b>' + E(distTxt(g.dist)) + "</b> from home</div>" : '<div class="cr-s"><b>' + E(where) + "</b></div>") + (g ? '<div class="cr-s">' + E(llTxt(g)) + "</div>" : "") + (num("heading") !== null ? '<div class="cr-s">Heading ' + fmt(num("heading")) + "\u00b0 " + ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(num("heading") / 45) % 8] + "</div>" : "") + "</div></div>";
  }
  var actCard = function (flex) { return '<div class="cr-c' + (flex ? " cr-flex cr-actc" : "") + '"><div class="cr-l" style="margin-bottom:6px">Activity</div><div class="cr-actlist">' + actHtml() + "</div></div>"; };
  var pillHtml = function () { var m = sv("motion"); if (m === null) return ""; var parked = /^(not moving|stopped|parked|idle|off|false)$/i.test(m), moving = /^(moving|driving|on|true)$/i.test(m); return '<span class="cr-pill">' + (parked ? CHK + " Parked" : moving ? "Driving" : E(cap(m))) + "</span>"; };

  /* The screen is built once from fixed slots. Each refresh only touches the slots whose content changed,
   * so the car picture, radar and list do not flicker when, say, "Updated 5 min ago" ticks over. */
  var SKELETON = '<div class="cr-grid"><div class="cr-col"><div class="cr-blk" data-b="fuel"></div><div class="cr-blk" data-b="mile"></div><div class="cr-blk" data-b="act"></div></div>' +
    '<div class="cr-mid"><div class="cr-blk" data-b="hero"></div><div class="cr-blk" data-b="chips"></div><div class="cr-conn" data-b="conn"></div></div>' +
    '<div class="cr-col"><div class="cr-blk" data-b="sec"></div><div class="cr-blk" data-b="tyre"></div><div class="cr-blk" data-b="loc"></div></div></div>';
  function overviewBlocks() {
    var sec = secRows();
    return {
      fuel: fuelCard(), mile: mileCard(), act: actCard(true),
      hero: '<div class="cr-hero">' + carImg() + '<div class="cr-stripe"><i></i><i></i><i></i></div></div>',
      chips: chips(), conn: connHtml(),
      sec: sec ? '<div class="cr-c"><div class="cr-l">Security</div><div class="cr-stack">' + sec + "</div></div>" : "",
      tyre: tyreMini(), loc: locCard()
    };
  }

  /* ---- shell: a single full-screen Overview ---- */
  var _open = false, _timer = null, _built = false, _last = {}, _head = ["", "", ""];
  function build() {
    if (_built) return; _built = true;
    var el = document.createElement("div"); el.id = "car-overlay";
    el.innerHTML = '<div class="cr-head"><div class="cr-brand"><button class="cr-back" data-a="back" title="Back" aria-label="Back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><div class="cr-m"><i></i><i></i><i></i></div><div style="min-width:0"><div class="cr-title" id="cr-title"></div><div class="cr-sub" id="cr-sub" style="margin-top:5px"></div></div></div><div class="cr-pillbox" id="cr-pill"></div></div>' +
      '<div class="cr-body"><div class="cr-page" id="cr-p0"></div></div>';
    el.addEventListener("click", function (e) { if (e.target.closest("[data-a=back]")) closeCar(); });
    document.body.appendChild(el);
  }
  function render() {
    var c = cfg(); if (!c) return;
    document.getElementById("car-overlay").classList.toggle("cr-nobmw", !bmw());
    var hd = [c.name || "My car", c.subtitle || "", pillHtml()];
    if (hd[0] !== _head[0]) document.getElementById("cr-title").textContent = hd[0];
    if (hd[1] !== _head[1]) document.getElementById("cr-sub").textContent = hd[1];
    if (hd[2] !== _head[2]) document.getElementById("cr-pill").innerHTML = hd[2];
    _head = hd;
    var pg = document.getElementById("cr-p0");
    if (!pg.firstChild) { pg.innerHTML = SKELETON; _last = {}; }
    var b = overviewBlocks();
    Object.keys(b).forEach(function (k) {
      if (_last[k] === b[k]) return;                       // nothing changed here: leave the element alone
      _last[k] = b[k];
      var el = pg.querySelector('[data-b="' + k + '"]'); if (!el) return;
      var l1 = el.querySelector(".cr-actlist"), top = l1 ? l1.scrollTop : 0;   // keep the activity list where it is
      el.innerHTML = b[k];
      var l2 = el.querySelector(".cr-actlist"); if (l2) l2.scrollTop = top;
    });
  }
  window.carRefresh = function () { if (_open) render(); };
  window.openCar = function () {
    if (!window._carConfigured()) return;
    haptic("light"); typeof _closeLauncher === "function" && _closeLauncher();
    build(); _open = true; _last = {}; _head = ["", "", ""]; document.getElementById("cr-p0").innerHTML = ""; render();
    document.getElementById("car-overlay").classList.add("open");
    loadAct(); _timer = setInterval(function () { render(); if (Date.now() - _actAt > 60000) loadAct(); }, 4000);
    window._showSwipeDownHint && window._showSwipeDownHint();
  };
  window.closeCar = function () {
    haptic("light"); _open = false; clearInterval(_timer); _timer = null;
    var el = document.getElementById("car-overlay"); el && el.classList.remove("open");
  };
  /* make the launcher button appear once the car is configured */
  if (typeof applyAllSettings === "function") { try { applyAllSettings(); } catch (e) {} }
})();
