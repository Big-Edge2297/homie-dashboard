# Changelog

All notable changes to Homie Dashboard are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [5.1.3] - 2026-11-26

### Security
- **Climate card.** The climate entity's state and target temperature are no longer put into the page as markup. Only the known modes (`cool`, `heat`, `fan_only`, `dry`, `auto`) set a mode class, and the target temperature is always shown as a number.
- **Setup values are escaped everywhere they are shown.** These values come from the setup wizard, which only admins can save, but they render for every user:
  - scene icons and colours, the outdoor air quality level colours, and the calendar colours (a colour must now be a plain colour value; calendar colours must be `#rrggbb`);
  - meal, habit and mood icons: built-in icons are drawn as before and anything else, such as an emoji, is shown as text;
  - the greeting slot names in the time-of-day theme settings, and the presence detection type (only `person` or `animal`).
- **Camera streams no longer fall back to Google's public STUN server.** When Home Assistant provides no ICE servers, no third-party server is contacted and the tablet's address is not sent to Google. Cameras on your own network work as before. If you view cameras from outside your network and need a server, add `cameraIceServers` in the Advanced step, for example `[{"urls": "stun:stun.example.com:3478"}]`.
- **Smaller fixes.** An error message in the camera history and the database size on the System screen are escaped, and a personal entity id was removed from the helper override list.

## [5.1.2] - 2026-11-24

### Security
- **Playing an item from the music library no longer breaks on special characters.** In the media browser, an item that can be played directly (a local file, a DLNA or Plex item, a streaming service track) passed its id and type to the click handler as plain escaped text. The browser decodes that text again before the code runs, so a name with an apostrophe broke the click, and a crafted name could run script inside the dashboard. These values now go through the same safe helper as the other handlers, so the handler receives the exact text.

### Changed
- **Releases now include `homie_dashboard.zip`.** HACS installs and updates from it (`zip_release` in `hacs.json`), and GitHub counts its downloads, which two new counters at the top of the README show. Nothing changes for you: update in HACS and restart as before. For a manual install, download `homie_dashboard.zip` from the release and extract it into `config/custom_components/homie_dashboard/`.

## [5.1.1] - 2026-11-17

### Security
- **Names and labels from Home Assistant are escaped everywhere they are shown.** Camera, music player, irrigation and room names (and titles from your music library) were written into the page as HTML in a few places. A name containing markup would have run as HTML inside the dashboard. The music source list, camera grid, camera filter chips, motion log and irrigation buttons now escape them.
- **Values in inline click handlers are passed safely.** Escaping text for HTML is not enough inside a handler such as `onclick="play('…')"`: the browser decodes it again before running the code, so an apostrophe could break out of the string. Handlers now receive their values through a proper JavaScript string encoder, and camera filter chips pass an index instead of the label. This also covers media browser items, to-do items, notifications, themes and sensor panels.
- The panel's start-up error message is shown as text only.

### Fixed
- Rooms, groups and camera filters whose name contains an apostrophe or a quote (for example "Kid's room") no longer break their click handler. Room and group ids are now built only from letters, digits and underscores, so two different names can never share an id either.
- **Tablets could get IP-banned.** The session token Homie uses lasts 30 minutes. A tablet that slept for a while woke up and sent several requests (calendars, for example) with the expired token, and Home Assistant counted each one as a failed login. The dashboard now makes sure the token is valid before every request and every WebSocket login, re-checks it when the screen wakes, and holds back further requests for a minute after any rejected request instead of repeating them.

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

[5.1.3]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.3
[5.1.2]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.2
[5.1.1]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.1
[5.1.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.0
[5.0.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.0.0
[4.3.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v4.3.0
