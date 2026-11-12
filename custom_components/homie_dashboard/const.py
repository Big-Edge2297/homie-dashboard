"""Constants for Homie Dashboard."""

DOMAIN = "homie_dashboard"

PANEL_URL_PATH = "homie-dashboard"
PANEL_COMPONENT = "homie-dashboard-panel"

URL_FRONTEND = "/homie_dashboard_static"
URL_PHOTOS = "/api/homie_dashboard/photos"

CONF_TITLE = "sidebar_title"
CONF_ICON = "sidebar_icon"
CONF_REQUIRE_ADMIN = "require_admin"

DEFAULT_TITLE = "Homie"
DEFAULT_ICON = "mdi:tablet-dashboard"

STORAGE_KEY = "homie_dashboard.config"
STORAGE_VERSION = 1

IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png", ".webp", ".gif")
MAX_CONFIG_BYTES = 1_000_000

# Signed photo URLs are valid for this long. The dashboard asks for fresh ones regularly.
PHOTO_URL_TTL_HOURS = 12

ALARM_SERVICES = {
    "arm_home": "alarm_arm_home",
    "arm_away": "alarm_arm_away",
    "arm_night": "alarm_arm_night",
    "arm_vacation": "alarm_arm_vacation",
    "disarm": "alarm_disarm",
}
