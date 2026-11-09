"""WebSocket commands used by the panel and the setup wizard."""
from __future__ import annotations

import json
import os
from typing import Any
from urllib.parse import quote

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DOMAIN, IMAGE_EXTENSIONS, MAX_CONFIG_BYTES, URL_MEDIA


def _scan_dir(directory: str, url_prefix: str) -> list[str]:
    """Return URLs of all images directly inside directory (sorted, case-insensitive)."""
    try:
        names = sorted(os.listdir(directory), key=str.lower)
    except OSError:
        return []
    return [
        f"{url_prefix}/{quote(name)}"
        for name in names
        if name.lower().endswith(IMAGE_EXTENSIONS) and os.path.isfile(os.path.join(directory, name))
    ]


def scan_photos(media_dir: str) -> dict[str, list[str]]:
    return {
        "frame": _scan_dir(os.path.join(media_dir, "photos"), f"{URL_MEDIA}/photos"),
        "background": _scan_dir(os.path.join(media_dir, "photos", "background"), f"{URL_MEDIA}/photos/background"),
    }


def async_register_commands(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_get_config)
    websocket_api.async_register_command(hass, ws_set_config)
    websocket_api.async_register_command(hass, ws_reset_config)


@websocket_api.websocket_command({vol.Required("type"): "homie_dashboard/get_config"})
@websocket_api.async_response
async def ws_get_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    data = hass.data[DOMAIN]
    store = data["store"]
    photos = await hass.async_add_executor_job(scan_photos, data["media_dir"])
    connection.send_result(
        msg["id"],
        {
            "configured": store.configured,
            "config": store.config,
            "settings": store.settings,
            "photos": photos,
            "version": data.get("version", ""),
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "homie_dashboard/set_config",
        vol.Required("config"): dict,
        vol.Required("settings"): dict,
    }
)
@websocket_api.async_response
async def ws_set_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if len(json.dumps([msg["config"], msg["settings"]])) > MAX_CONFIG_BYTES:
        connection.send_error(msg["id"], "too_large", "Configuration is too large")
        return
    await hass.data[DOMAIN]["store"].async_save(msg["config"], msg["settings"])
    connection.send_result(msg["id"], {"saved": True})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "homie_dashboard/reset_config"})
@websocket_api.async_response
async def ws_reset_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    await hass.data[DOMAIN]["store"].async_reset()
    connection.send_result(msg["id"], {"reset": True})
