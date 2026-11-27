# Changelog

All notable changes to Homie Dashboard are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [5.2.0] - 2026-11-27

**Homie Dashboard is now in the Home Assistant Marketplace.** This release also adds the Kiosk Satellite guide with `?screen=` deeplinks, a new Car dashboard, a redesigned setup wizard, and every security fix from 5.0.0 to 5.1.3.

| Feature | What's new |
|---|---|
| 🛒 **Marketplace** | Install from Settings → Marketplace on Home Assistant 2026.11 or newer |
| 📱 **Kiosk Satellite** | Step-by-step guide and `?screen=` deeplinks to open any screen from an automation |
| 🚗 **Car dashboard** | Fuel, service, security, tyres, location and activity, with BMW CarData auto-detect |
| 🧙 **Redesigned setup wizard** | Six sections, new tabs for air quality, alarm, pet, plants and more, and no JSON editing needed |
| 🔐 **Security** | All fixes from 5.0.0 to 5.1.3 included |
| 📖 **New README** | Screenshots of every screen and collapsible guides |

### Added

#### Marketplace
- **Official Marketplace integration.** Homie Dashboard is now part of the default catalog of the Home Assistant Marketplace (the former HACS default repositories), so you can find it by searching. On Home Assistant 2026.11 or newer, open **Settings → Marketplace**, search for **Homie Dashboard** and click **Install**. On older versions, install it manually. The README has both sets of steps.

#### Kiosk Satellite and wall tablets
- **Kiosk Satellite guide** (`docs/kiosk-satellite.md`). Connect Kiosk Satellite to Home Assistant, create the Remote Management token, add the REST commands, and use the example automations provided in the guide: open Now Playing while music plays, and switch the tablet screen on and off with a presence sensor. Includes a troubleshooting table.
- **Open a screen from a link.** `/homie-dashboard?screen=nowplaying` (or any Startup screen name) opens that screen for one visit, so an automation can show a screen on a wall tablet with a kiosk app such as Kiosk Satellite or Fully Kiosk. `car` is accepted too. If the dashboard is already open and the address changes, it switches without a reload.

#### Car dashboard
- **Car dashboard.** A new full-screen dashboard for your car, with BMW M styling and a soft grey-blue background. Built and tested with the BMW CarData integration, and usable with any car integration because every sensor is chosen in the wizard. One Overview screen shows:
  - fuel ring and range (the ring turns red below 10%) and mileage;
  - service status (service, engine oil, brake fluid, vehicle check);
  - security: lock, alarm, doors, windows, hood and tailgate;
  - tyre pressures against their targets (amber from 10 and red from 30 units away, adjustable) with the tyre diagnosis;
  - location with distance from home, heading and a small radar;
  - recent activity and connection status.
- **Car step in the setup wizard** to pick each sensor, with **auto-detect** for the BMW CarData names, manual tyre targets, tyre thresholds, a home location (defaults to Home Assistant's), the car name, and a subtitle.
- **BMW M styling is optional.** A toggle in the Car step turns off the M stripes and swaps the M blue for a neutral steel blue, for other brands. The car's **name** and **subtitle**, shown in the top-left corner, are set in the same step.
- A **Car** button in the Dashboards hub and a **Car** toggle in Settings. The button only appears once a sensor is chosen.
- **Activity** looks back 48 hours by default, with a setting in the Car step (1 hour to 7 days). It keeps up to 50 events and scrolls, shows plain words instead of raw sensor values (Open/Closed, Locked/Unlocked, Not armed, Moving), and shows dates for older events.
- **Car picture:** copy a transparent PNG to `/config/homie_dashboard/car/`. It is served through the same authenticated, signed-link endpoint as the other photos.

#### Setup wizard: new layout
- **Six sections with sub-tabs.** The long row of 27 steps is now six numbered sections: Welcome, General, Pills, Dashboards, Advanced and Review & Save. General holds Alexa timers, Floor Sensors, Greeting, Home Stats, Notifications and Travel Time. Pills holds Bath, Blinds, Climate, Lights, Plants, Scenes and Switches. Dashboards holds Air Quality, Alarm, Calendar, Cameras, Car, Music, My Day, Pet, Presence, Solar and Weather. The tabs inside a section are sorted A to Z, a section reopens on the tab you used last, and Back and Next still walk through every step in order.
- **The Home step is split into four tabs.** Weather, Alarm, Music and Calendar each have their own tab. The Alarm tab holds all alarm settings: alarm panel, code, status groups, and siren and garage buttons.
- **"Climate & more" is now "Climate"** (Air Con and Purifiers), with Blinds and Switches in their own tabs.
- **Backup & restore.** Download all your settings as one file and restore them on another Home Assistant or after a reinstall. It lives in the Welcome step. The alarm code is never exported, and photos are not included.
- **Reset everything has proper safeguards.** It is now a Danger zone in the Advanced step. A warning dialog lists what is deleted, offers a backup download, and only enables the button after you tick "I understand" and type RESET. It returns Homie to a new installation; photos are kept.

#### Setup wizard: new and reworked tabs (no more JSON)
- **Switches** can now include **automations** next to switches and on/off helpers (the search box finds them), and you can toggle them on and off from the Switches popup.
- **Air quality.** Choose the outdoor AQI, PM2.5, PM10, CO and NO₂ sensors for the weather screen (with **auto-detect**), then add the rooms of the Indoor AQI screen: a name, an icon and up to seven sensors per room (temperature, humidity, CO₂, TVOC, PM2.5, NOx and air quality index). Sensor lists show the matching type first. The Good and Fair levels of the room index are adjustable. A card also changes the limit, label, colour and message of each outdoor AQI level, with add, remove and reset to defaults. The last level always covers everything above. Existing `aqi` and `indoorAqi` settings are picked up automatically.
- **Alarm.** The Windows, Doors, Motion and Garage tiles of the Alarm screen can be chosen here (with a short explanation of how to create the groups with Home Assistant helpers). The **siren and garage buttons** are configurable too: choose your own siren, switch or cover (or separate buttons, scripts or scenes), and Homie runs the matching Home Assistant action. On and Off can be a **siren** entity, Open and Close can be a **cover** entity, and an optional **siren status entity** shows whether the siren is sounding on the Alarm screen. An imported v4 setup keeps working.
- **My Day.** The meal slots, the daily habits, the mood picker and the habits and mood sync helpers, in one place. The Habits & mood tab is merged into it, the meal slots moved over from Greeting (now just Greeting), and the sync helpers moved over from Calendar. The meal calendar stays in the Calendar step.
- **Pet.** Pet name, a switch to hide the Pet button, and every entity of the Pet screen: litter box (uses today, last used, uses since last clean, reset automation, Toggle Clean helper), feeder (feedings, food, desiccant, desiccant lifetime) and water fountain (volume, filter life), plus the thresholds and colours of the litter usage chart.
- **Bath.** The bathroom toggles (water heater, fans, towel warmers). Add your own sections (for example House, Main Bath, Ensuite), reorder them, and choose a section for each toggle. An imported v4 Bath group, with or without sections, is picked up automatically; one with expandable rows is kept unchanged.
- **Plants.** Plant moisture sensors (with names), the dry and wet levels, and the irrigation switches. An imported v4 Plants group is picked up automatically. The Plants button shows as soon as plant sensors are chosen, with or without irrigation switches.
- **Notifications, Alexa timers and Travel time.** Notifications has a note on which entity types can be dismissed by tapping. Alexa timers uses the Echo "next timer" sensors, labelled by room. In Travel time, each journey has its own sensor, label, days of the week and start and end hour. A warning shows when a travel time can never appear. A travel time saved as a single entry by an older version is picked up and kept working.
- **Cameras:** snapshot refresh, live video (full screen and grid), status label and grid quality, and **own STUN or TURN servers**. The servers are needed only to watch live video from outside your network (the Google fallback was removed in 5.1.3). One server per line, with an optional user name and password for TURN. It used to be the `cameraIceServers` JSON setting.
- **Music:** how long the player stays after playback stops.
- The **Advanced step** no longer lists air quality or pet stats, since they have their own tabs.

#### Documentation
- **README rebuilt** with generated screenshots of every dashboard, entity screen and theme (a demo home with made-up devices), collapsible guides, and a link to the Kiosk Satellite guide.

### Changed
- **v4 siren, garage and siren status settings are moved into the Alarm tab** when the wizard opens, and are removed from the saved config once you save. The buttons behave exactly as before. If a single siren or cover entity is also set, the v4 list is left alone and still takes priority.
- **The Advanced step no longer shows a JSON box** unless the config holds settings that have no step. Everything that has a step is hidden from it and kept safe.
- **The System screen follows the Marketplace.** From Home Assistant 2026.11 HACS is built in as the Marketplace, which no longer answers the commands the two HACS cards used. They now read **Marketplace** and **Marketplace Updates**, counting the repositories installed through it and their pending updates. On Home Assistant 2026.10 or older they still read HACS. Updates of installed repositories are counted once, in these cards, as before.

### Fixed
- **An updated panel script is picked up without a version bump.** The panel script address now includes a short fingerprint of the file, so a browser no longer keeps an old copy after you update the integration files.

### Security
- **Every security fix from 5.0.0 to 5.1.3 is included in this release.** That is the signed, authenticated photo endpoint (the old public media path is gone), the alarm code kept on the server and never sent to the browser, the saved code limited to admins, the bundled fonts, the escaping of names, labels and inline handler values, and the 5.1.3 fixes below.
- **The new Car dashboard and the new setup wizard options follow the same rules.** Values chosen in the wizard (icons, colours, presence type, greeting slots, level colours) are escaped or validated wherever they are shown, and the camera streams no longer use Google's public STUN server (see 5.1.3).

### Removed
- **Photo frame: seconds per photo** is no longer a setting. The photo frame advances every 20 seconds.

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

[5.2.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.2.0
[5.1.3]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.3
[5.1.2]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.2
[5.1.1]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.1
[5.1.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.1.0
[5.0.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v5.0.0
[4.3.0]: https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v4.3.0
