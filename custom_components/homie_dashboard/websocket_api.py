"""WebSocket commands used by the panel, the setup wizard and the dashboard."""
from __future__ import annotations

from datetime import timedelta
import json
from typing import Any
from urllib.parse import quote

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.http.auth import async_sign_path
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError

from .const import (
    ALARM_SERVICES,
    DOMAIN,
    MAX_CONFIG_BYTES,
    PHOTO_URL_TTL_HOURS,
    URL_PHOTOS,
)
from .media import list_images


def _can_use_saved_code(store, connection: websocket_api.ActiveConnection) -> bool:
    """The saved alarm code is usable by administrators, and by other users only if allowed."""
    if not store.alarm_code:
        return False
    user = connection.user
    return bool(user and user.is_admin) or bool(store.settings.get("alarmAllowNonAdmin"))


def async_register_commands(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_get_config)
    websocket_api.async_register_command(hass, ws_get_photos)
    websocket_api.async_register_command(hass, ws_set_config)
    websocket_api.async_register_command(hass, ws_reset_config)
    websocket_api.async_register_command(hass, ws_alarm)


async def _signed_photos(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection
) -> dict[str, list[dict[str, str]]]:
    """Return {kind: [{path, url}]}. `path` is stable; `url` is signed and time limited."""
    names = await hass.async_add_executor_job(list_images, hass.data[DOMAIN]["media_dir"])
    expiry = timedelta(hours=PHOTO_URL_TTL_HOURS)
    result: dict[str, list[dict[str, str]]] = {}
    for kind, files in names.items():
        items = []
        for name in files:
            path = f"{URL_PHOTOS}/{kind}/{quote(name)}"
            url = async_sign_path(hass, path, expiry, refresh_token_id=connection.refresh_token_id)
            items.append({"path": path, "url": url})
        result[kind] = items
    return result


@websocket_api.websocket_command({vol.Required("type"): "homie_dashboard/get_config"})
@websocket_api.async_response
async def ws_get_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    data = hass.data[DOMAIN]
    store = data["store"]
    connection.send_result(
        msg["id"],
        {
            "configured": store.configured,
            "config": store.config,
            # The alarm code itself is never sent to the browser, only whether one is stored.
            "settings": {
                **store.settings,
                "alarmCodeSet": bool(store.alarm_code),
                "alarmCodeUsable": _can_use_saved_code(store, connection),
            },
            "photos": await _signed_photos(hass, connection),
            "version": data.get("version", ""),
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "homie_dashboard/get_photos"})
@websocket_api.async_response
async def ws_get_photos(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    connection.send_result(msg["id"], {"photos": await _signed_photos(hass, connection)})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "homie_dashboard/set_config",
        vol.Required("config"): dict,
        vol.Required("settings"): dict,
        # None / missing keeps the stored code, "" removes it, any other text replaces it
        vol.Optional("alarm_code"): vol.Any(None, str),
    }
)
@websocket_api.async_response
async def ws_set_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    settings = {k: v for k, v in msg["settings"].items() if k not in ("alarmCode", "alarmCodeSet", "alarmCodeUsable")}
    if len(json.dumps([msg["config"], settings])) > MAX_CONFIG_BYTES:
        connection.send_error(msg["id"], "too_large", "Configuration is too large")
        return
    await hass.data[DOMAIN]["store"].async_save(msg["config"], settings, msg.get("alarm_code"))
    connection.send_result(msg["id"], {"saved": True})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "homie_dashboard/reset_config"})
@websocket_api.async_response
async def ws_reset_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    await hass.data[DOMAIN]["store"].async_reset()
    connection.send_result(msg["id"], {"reset": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "homie_dashboard/alarm",
        vol.Required("service"): vol.In(list(ALARM_SERVICES)),
    }
)
@websocket_api.async_response
async def ws_alarm(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Arm or disarm the configured alarm panel, adding the stored code on the server side."""
    store = hass.data[DOMAIN]["store"]
    entity_id = store.config.get("alarmEntity")
    if not entity_id or not store.alarm_code:
        connection.send_error(msg["id"], "not_configured", "No alarm panel or alarm code is configured")
        return
    if not _can_use_saved_code(store, connection):
        connection.send_error(msg["id"], "unauthorized", "Only administrators can use the saved alarm code")
        return
    try:
        await hass.services.async_call(
            "alarm_control_panel",
            ALARM_SERVICES[msg["service"]],
            {"entity_id": entity_id, "code": store.alarm_code},
            blocking=True,
            context=connection.context(msg),
        )
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "failed", str(err))
        return
    connection.send_result(msg["id"], {"done": True})
