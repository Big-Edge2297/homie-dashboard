"""Persistent storage for the dashboard configuration (lives in .storage)."""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION


class HomieStore:
    """Wraps the HA Store so settings survive HACS updates.

    The alarm code is kept in its own field and is never handed out to the browser:
    the server adds it itself when the dashboard asks to arm or disarm.
    """

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._data: dict[str, Any] | None = None

    async def async_load(self) -> None:
        data = await self._store.async_load()
        # Migrate 5.0.0, which kept the code inside the (browser-visible) settings.
        if data and "alarmCode" in data.get("settings", {}):
            settings = dict(data["settings"])
            code = settings.pop("alarmCode")
            data = {**data, "settings": settings}
            if code and not data.get("alarm_code"):
                data["alarm_code"] = str(code)
            await self._store.async_save(data)
        self._data = data

    @property
    def configured(self) -> bool:
        return self._data is not None

    @property
    def config(self) -> dict[str, Any]:
        return (self._data or {}).get("config", {})

    @property
    def settings(self) -> dict[str, Any]:
        return (self._data or {}).get("settings", {})

    @property
    def alarm_code(self) -> str:
        return (self._data or {}).get("alarm_code", "")

    async def async_save(
        self, config: dict[str, Any], settings: dict[str, Any], alarm_code: str | None = None
    ) -> None:
        """Save. alarm_code: None keeps the stored code, "" removes it, anything else replaces it."""
        code = self.alarm_code if alarm_code is None else alarm_code
        self._data = {"config": config, "settings": settings, "alarm_code": code}
        await self._store.async_save(self._data)

    async def async_reset(self) -> None:
        self._data = None
        await self._store.async_remove()
