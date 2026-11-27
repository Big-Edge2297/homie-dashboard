"""Homie Dashboard — a touch-first dashboard for wall-mounted tablets."""
from __future__ import annotations

import hashlib
import logging
import os
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import (
    CONF_ICON,
    CONF_REQUIRE_ADMIN,
    CONF_TITLE,
    DEFAULT_ICON,
    DEFAULT_TITLE,
    DOMAIN,
    PANEL_COMPONENT,
    PANEL_URL_PATH,
    URL_FRONTEND,
)
from .store import HomieStore
from .views import HomiePhotoView
from .websocket_api import async_register_commands

_LOGGER = logging.getLogger(__name__)


def _ensure_media_dirs(media_dir: str) -> None:
    os.makedirs(os.path.join(media_dir, "photos", "background"), exist_ok=True)
    os.makedirs(os.path.join(media_dir, "car"), exist_ok=True)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Homie Dashboard from a config entry."""
    integration = await async_get_integration(hass, DOMAIN)
    version = str(integration.version or "")

    store = HomieStore(hass)
    await store.async_load()

    media_dir = hass.config.path(DOMAIN)
    await hass.async_add_executor_job(_ensure_media_dirs, media_dir)

    domain_data = hass.data.setdefault(DOMAIN, {})
    domain_data.update({"store": store, "media_dir": media_dir, "version": version})

    # Static routes, views and WS commands cannot be unregistered, so register them once per HA run.
    if not domain_data.get("registered"):
        # Only the dashboard code is served as static (public) files. Photos go through an
        # authenticated view and are handed out as time-limited signed URLs.
        await hass.http.async_register_static_paths(
            [StaticPathConfig(URL_FRONTEND, str(Path(__file__).parent / "frontend"), cache_headers=False)]
        )
        hass.http.register_view(HomiePhotoView(hass, media_dir))
        async_register_commands(hass)
        domain_data["registered"] = True

    # The panel script is cached by the browser per address, so tie the address to the file itself:
    # an updated panel.js is picked up even when the version number did not change.
    panel_js = Path(__file__).parent / "frontend" / "panel.js"
    panel_hash = await hass.async_add_executor_job(lambda: hashlib.sha256(panel_js.read_bytes()).hexdigest()[:8])

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name=PANEL_COMPONENT,
        frontend_url_path=PANEL_URL_PATH,
        module_url=f"{URL_FRONTEND}/panel.js?v={version}-{panel_hash}",
        sidebar_title=entry.options.get(CONF_TITLE, DEFAULT_TITLE),
        sidebar_icon=entry.options.get(CONF_ICON, DEFAULT_ICON),
        require_admin=entry.options.get(CONF_REQUIRE_ADMIN, False),
        config={"version": version},
    )

    entry.async_on_unload(entry.add_update_listener(_async_reload_on_change))
    _LOGGER.debug("Homie Dashboard %s ready (panel /%s)", version, PANEL_URL_PATH)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the sidebar panel. Stored settings are kept."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    return True


async def _async_reload_on_change(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)
