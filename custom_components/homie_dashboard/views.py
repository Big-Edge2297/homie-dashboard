"""Authenticated photo endpoint. Requires a signed-in user or a signed URL (authSig)."""
from __future__ import annotations

from aiohttp import web

from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .const import URL_PHOTOS
from .media import resolve_photo


class HomiePhotoView(HomeAssistantView):
    """Serve photo frame / background pictures to authenticated requests only."""

    url = URL_PHOTOS + "/{kind}/{filename}"
    name = "api:homie_dashboard:photos"
    requires_auth = True

    def __init__(self, hass: HomeAssistant, media_dir: str) -> None:
        self._hass = hass
        self._media_dir = media_dir

    async def get(self, request: web.Request, kind: str, filename: str) -> web.StreamResponse:
        path = await self._hass.async_add_executor_job(resolve_photo, self._media_dir, kind, filename)
        if path is None:
            raise web.HTTPNotFound()
        return web.FileResponse(
            path,
            headers={"Cache-Control": "private, max-age=3600", "X-Content-Type-Options": "nosniff"},
        )
