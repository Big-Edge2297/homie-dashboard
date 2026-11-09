/* Homie Dashboard — sidebar panel (web component)
 * Hosts the dashboard (index.html) or the setup wizard (setup.html) in a
 * same-origin iframe and hands it the logged-in Home Assistant session via
 * window.homieBridge. No access token is ever written to disk. */
const FRONTEND = "/homie_dashboard_static";

class HomieDashboardPanel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._started = false;
    this._data = { configured: false, config: {}, settings: {}, photos: { frame: [], background: [] } };
    this._token = "";
    this._iframe = null;
  }

  connectedCallback() {
    // Home Assistant does not always give custom panels a definite height, so size to the viewport.
    this.style.cssText = "display:block;position:relative;width:100%;height:100vh;height:100dvh;min-height:300px;background:#000;overflow:hidden";
    if (!this._iframe && !this.firstChild) {
      this.innerHTML = '<div id="homie-status" style="padding:32px;color:#bbb;font:16px system-ui,sans-serif">Loading Homie Dashboard…</div>';
    }
    // Never leave a blank page: report if startup stalls.
    clearTimeout(this._watchdog);
    this._watchdog = setTimeout(() => {
      if (!this._iframe) this._fail("Startup is taking too long. Check Settings → System → Logs for 'homie_dashboard' and the browser console for errors.");
    }, 10000);
  }

  _fail(msg) {
    console.error("[Homie] " + msg);
    this.innerHTML = `<div style="padding:32px;color:#eee;font:16px system-ui,sans-serif"><b>Homie Dashboard could not start</b><br><br>${String(msg)}</div>`;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._started) { this._started = true; this._init(); }
  }
  set panel(p) { this._panelInfo = p; }
  set narrow(_v) {}
  set route(_v) {}

  get _version() { return (this._panelInfo && this._panelInfo.config && this._panelInfo.config.version) || ""; }

  _auth() {
    const h = this._hass;
    return h.auth || (h.connection && h.connection.options && h.connection.options.auth);
  }

  async _freshToken() {
    const a = this._auth();
    if (!a) throw new Error("No Home Assistant auth available");
    const exp = a.data && a.data.expires;
    if (a.expired || (exp && exp - Date.now() < 120000)) await a.refreshAccessToken();
    this._token = a.accessToken || (a.data && a.data.access_token) || "";
    return this._token;
  }

  async _fetchData() {
    this._data = await this._hass.callWS({ type: "homie_dashboard/get_config" });
  }

  async _init() {
    const self = this;
    window.homieBridge = {
      get token() { return self._token; },
      get config() { return self._data.configured ? self._data.config : null; },
      get rawConfig() { return self._data.config || {}; },
      get settings() { return self._data.settings || {}; },
      get photos() { return self._data.photos || { frame: [], background: [] }; },
      get configured() { return !!self._data.configured; },
      get version() { return self._version; },
      get timeZone() { return self._hass && self._hass.config && self._hass.config.time_zone; },
      get isAdmin() { return !!(self._hass && self._hass.user && self._hass.user.is_admin); },
      hass: () => self._hass,
      getToken: () => self._freshToken(),
      async saveConfig(payload) {
        await self._hass.callWS({ type: "homie_dashboard/set_config", config: payload.config || {}, settings: payload.settings || {} });
        await self._fetchData();
      },
      async resetConfig() {
        await self._hass.callWS({ type: "homie_dashboard/reset_config" });
        await self._fetchData();
      },
      async openDashboard() { await self._fetchData(); self._show("index"); },
      openSetup() { self._show("setup"); },
    };

    try {
      await Promise.all([this._freshToken(), this._fetchData()]);
    } catch (err) {
      this._fail((err && (err.message || err.code)) ? (err.message || err.code) : JSON.stringify(err));
      return;
    }
    console.info("[Homie] panel ready. configured =", this._data.configured, "version =", this._version);
    const wantSetup = new URLSearchParams(location.search).has("setup") || !this._data.configured;
    this._show(wantSetup ? "setup" : "index");
  }

  _show(page) {
    const url = `${FRONTEND}/${page}.html?v=${encodeURIComponent(this._version)}&t=${Date.now()}`;
    if (!this._iframe) {
      this.innerHTML = "";
      const f = document.createElement("iframe");
      f.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;background:#000";
      f.setAttribute("allow", "fullscreen; autoplay; screen-wake-lock");
      f.setAttribute("allowfullscreen", "");
      this._iframe = f;
      this.appendChild(f);
    }
    this._iframe.src = url;
  }
}

customElements.define("homie-dashboard-panel", HomieDashboardPanel);
