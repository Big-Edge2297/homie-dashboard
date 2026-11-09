"""Persistent storage for the dashboard configuration (lives in .storage)."""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION


class HomieStore:
    """Wraps the HA Store so settings survive HACS updates."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._data: dict[str, Any] | None = None

    async def async_load(self) -> None:
        self._data = await self._store.async_load()

    @property
    def configured(self) -> bool:
        return self._data is not None

    @property
    def config(self) -> dict[str, Any]:
        return (self._data or {}).get("config", {})

    @property
    def settings(self) -> dict[str, Any]:
        return (self._data or {}).get("settings", {})

    async def async_save(self, config: dict[str, Any], settings: dict[str, Any]) -> None:
        self._data = {"config": config, "settings": settings}
        await self._store.async_save(self._data)

    async def async_reset(self) -> None:
        self._data = None
        await self._store.async_remove()
