/* ═══════════════════════════════════════════════════════════════════════════
 * Homie Dashboard — runtime configuration (v5)
 *
 * Replaces the old config.js. Nothing is stored in this file:
 *   • the access token comes from your logged-in Home Assistant session
 *   • entities and preferences come from the Setup wizard (stored in HA)
 * It defines the same globals the dashboard has always used:
 *   HA_TOKEN, WS_URL, BASE, ALARM_CODE, ALARM_ENTITY, PHOTO_FRAME_IMAGES,
 *   PHOTO_FRAME_INTERVAL, BACKGROUND_IMAGES, CONFIG
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
var _homieCfg = HomieCommon.resolve(HomieCommon.deepMerge(window.HOMIE_DEFAULTS || {}, _homieStored), typeof ICONS !== "undefined" ? ICONS : {});

const ALARM_CODE           = String(_homieSettings.alarmCode || "");
const ALARM_ENTITY         = _homieCfg.alarmEntity || "";
const PHOTO_FRAME_IMAGES   = _homiePhotos.frame || [];
const PHOTO_FRAME_INTERVAL = Number(_homieSettings.photoFrameInterval) || 20;
const BACKGROUND_IMAGES    = _homiePhotos.background || [];

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
