# Changelog

All notable changes to Homie Dashboard are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [5.1.0] - 2026-11-11

### Security
- **Photos are no longer served publicly.** Photo frame and background pictures are now delivered through an authenticated endpoint. The dashboard receives time-limited signed links (12 hours, tied to the signed-in session) and refreshes them automatically. The old unauthenticated `/homie_dashboard_media` path has been removed.
- **The alarm code is no longer sent to the browser.** It is stored privately in Home Assistant and added on the server when the dashboard arms or disarms through a new `homie_dashboard/alarm` command. The setup wizard never shows the saved code (it only shows that one is saved, and lets you replace or remove it). Codes saved by 5.0.0 are moved automatically on first start.
- **The saved alarm code is admin-only by default.** Other users (for example a wall-tablet user) are asked for the PIN. A new wizard option lets non-administrator users use the saved code as well.
- **No more requests to Google.** All 10 fonts of the font picker are now bundled with the integration (SIL Open Font License, licences included) instead of loading from Google Fonts.
- An error message in the media browser is now escaped before it is shown.

### Changed
- If no alarm code is saved, the dashboard asks for a PIN every time, as before.
- Photo and background selections are stored by a stable path. If you had chosen a background picture in 5.0.0, it resets once to the first picture.

## [5.0.0] - 2026-11-08

**Major release: Homie is now a Home Assistant integration installed through HACS.**
This is a breaking change for v4.x installs. See [Upgrading from v4.x](README.md#upgrading-from-v4x).

### Added
- **Home Assistant integration** (`custom_components/homie_dashboard`) with a config flow and a sidebar panel. Sidebar title, icon and an "administrators only" option can be changed from the integration's **Configure** button.
- **Setup wizard** to choose lights, scenes, air con, purifiers, blinds, switches, cameras (with motion sensors and doorbell), weather, sunrise/sunset, moon phase, alarm panel and code, music players and calendars. Rooms are suggested from Home Assistant areas, labels are cleaned up automatically, and scene icons and colours are picked from the scene name.
- **Import from v4**: the wizard finds your old `config.js` or lets you choose the file, and carries over every entity, label and setting. Custom control groups (for example *Bath* and *Plants*) are preserved unchanged.
- **Advanced editor** in the wizard for every other option (solar, garden, indoor air quality, presence, pet stats, home stats, security buttons, alarm groups and more).
- **Automatic photo detection**: drop images into `/config/homie_dashboard/photos/` (photo frame) and `/config/homie_dashboard/photos/background/` (overview backgrounds). No filename lists to maintain.
- **Setup wizard** shortcut in the dashboard under Settings → About.
- GitHub validation workflow (HACS and hassfest).

### Changed
- Settings are stored inside Home Assistant (`.storage/homie_dashboard.config`), so **HACS updates no longer overwrite your configuration**.
- The dashboard signs in with the logged-in Home Assistant session. The short-lived token is refreshed automatically, and the connection retries with a fresh token if it is rejected.
- The WebSocket address is now derived automatically from where Home Assistant is served. No server URL to configure.
- On-screen hints that mentioned `config.js` now point to the setup wizard or photo folders.
- Scenes without an icon or colour no longer render the text "undefined".

### Removed
- `config.js` and the Long-Lived Access Token requirement.
- The Lovelace resource (`homie-dashboard.js`) and the manual "Webpage" dashboard setup.
- Standalone installation by copying files to `config/www`. The dashboard needs the integration to sign in.

### Security
- No access token is stored in any file. Previously the token was kept in plain text in `config.js`.
- The alarm code is stored in Home Assistant's private `.storage` instead of a web-readable file.

### Migration notes
1. Keep a copy of your old `config.js` before removing the old entry from HACS.
2. Re-add the repository in HACS as type **Integration**, restart Home Assistant, add the integration and import your `config.js` in the wizard.
3. Delete the old *Webpage* dashboard and Lovelace resource, and **revoke the old Long-Lived Access Token**.

The v4.x code remains available as release `v4.3.0` and on the `legacy-4.x` branch.

## [4.3.0]
### Added
- New dashboard: Alarm
- New dashboard: Pet Stats

## [4.2.0]
### Added
- New Dashboards screen design
- New dashboard: Indoor AQI
- New dashboard: Insights
- New dashboard: Indoor Presence
- Favorites panel
- New Settings screen design

## [4.0.0]
### Added
- Card based overview screen
- Siren and garage/gate in security
- Plant moisture

## [3.7.0]
### Added
- Settings for clock 12/24hr and screensaver
- Hourly forecast in weather
- Moon phase in the sun arc
- Doorbell triggers a full screen camera when someone rings the bell
- Pop-up selector for music players instead of tap to switch

## [3.6.0]
### Added
- Time of Day Theme: apply different themes based on time of day
- Waze travel notification customizable for selected days and times
- Gesture settings for scroll from the top, scroll from the bottom and pinch to exit back to the overview
- More stats in the Solar dashboard

## [3.5.0]
### Added
- Countdown timers from the Amazon Alexa integration or other HA integrations
- Camera dashboard
- Solar dashboard

## [3.4.0]
### Added
- Trends in AQI and weather stats

## [3.3.0]
### Added
- HA check functionality for smart light bulbs and switches, passing the appropriate entities in Lights

## [3.2.0]
### Added
- HACS integration

## [3.1.0]
### Added
- 10 fonts in settings
- Swipe down from dashboards to return to the main screen

## [3.0.0]
### Added
- Settings cog to customize settings directly from the dashboard
- New overview screen with side controls
- Analog and digital clock dashboards
- Weather dashboard with adaptive weather conditions
- Mood tracker in My Day
- Habit and mood history for up to 30 days
- Volume control in music players
- Themed background based on theme selection
- Bloom intensity for brighter/darker background
- Greeting and dashboard name personalization
- Weather pop-up in the main overview screens
- Language selection

## [2.1.0]
### Added
- Support for more than 2 music players
- Hide top right buttons
- Sensor row customization

## [2.0.0]
### Added
- Separate configuration file for much easier setup
- Now Playing dashboards: 2 full screen music dashboards
- My Day dashboard: calendar, to-do, meals, habits
- Memories dashboard: digital photo frame
- Thermostat dashboard

## [1.1.0]
### Added
- Support for Spotify and Music Assistant
- Support for media browsing
- Alarmo controls

## [1.0.0]
First release.
- 9 themes
- Works both vertically and horizontally
- Fullscreen on first tap
- No pinch-zoom, no text selection
- Very responsive and fast entity status updates
- Pop-ups with many entities use a room accordion
- Notifications and reminders
- Music playback and controls
- Haptic feedback on supported Android devices

[5.1.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.0
[5.0.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.0.0
[4.3.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v4.3.0
