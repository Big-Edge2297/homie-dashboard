"""Config flow for Homie Dashboard."""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback

from .const import (
    CONF_ICON,
    CONF_REQUIRE_ADMIN,
    CONF_TITLE,
    DEFAULT_ICON,
    DEFAULT_TITLE,
    DOMAIN,
)


def _schema(defaults: dict[str, Any]) -> vol.Schema:
    return vol.Schema(
        {
            vol.Required(CONF_TITLE, default=defaults.get(CONF_TITLE, DEFAULT_TITLE)): str,
            vol.Required(CONF_ICON, default=defaults.get(CONF_ICON, DEFAULT_ICON)): str,
            vol.Required(CONF_REQUIRE_ADMIN, default=defaults.get(CONF_REQUIRE_ADMIN, False)): bool,
        }
    )


class HomieDashboardConfigFlow(ConfigFlow, domain=DOMAIN):
    """Single-step flow: choose how the dashboard appears in the sidebar."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title="Homie Dashboard", data={}, options=user_input)
        return self.async_show_form(step_id="user", data_schema=_schema({}))

    @staticmethod
    @callback
    def async_get_options_flow(config_entry) -> OptionsFlow:
        return HomieDashboardOptionsFlow()


class HomieDashboardOptionsFlow(OptionsFlow):
    """Change the sidebar title, icon and admin-only setting."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        return self.async_show_form(step_id="init", data_schema=_schema(dict(self.config_entry.options)))
