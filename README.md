# **Homie Dashboard**

[![Marketplace](https://img.shields.io/badge/Marketplace-Default-orange)](https://www.home-assistant.io/integrations/marketplace/) [![Release](https://img.shields.io/github/v/release/Big-Edge2297/homie-dashboard)](https://github.com/Big-Edge2297/homie-dashboard/releases) [![Downloads](https://img.shields.io/github/downloads/Big-Edge2297/homie-dashboard/total?label=Downloads)](https://github.com/Big-Edge2297/homie-dashboard/releases) [![Latest Release](https://img.shields.io/github/downloads/Big-Edge2297/homie-dashboard/latest/total?label=Latest%20Release)](https://github.com/Big-Edge2297/homie-dashboard/releases/latest) [![Validate](https://img.shields.io/github/actions/workflow/status/Big-Edge2297/homie-dashboard/validate.yml?branch=main&logo=github&label=Validate)](https://github.com/Big-Edge2297/homie-dashboard/actions/workflows/validate.yml)

<img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/homie-banner.png" alt="Homie Dashboard" width="100%"/>

Homie Dashboard is a touch-first Home Assistant dashboard designed for wall-mounted tablets.

It provides a customizable overview of your home while supporting dedicated dashboard modes for music, calendars, weather, photos, thermostats, cameras, clocks, alarm, solar monitoring and more.

**Designed for:**
- ✅ Wall-mounted tablets
- ✅ Dedicated Home Assistant displays
- ✅ Touch-first interfaces

**Not designed for:**
- ❌ Phones
- ❌ Desktop browsers as primary usage
- ❌ Small screens

[Screenshots](#screenshots) · [Installation](#installation) · [Setup wizard](#setup-wizard) · [Kiosk Satellite](#kiosk-satellite-setup-and-automations) · [Upgrading from v4](#upgrading-from-v4x) · [Security](#security) · [Troubleshooting](#troubleshooting) · [Changelog](CHANGELOG.md)

> [!IMPORTANT]
> **v5.0.0 is a major change.** Homie is now a proper Home Assistant integration installed from the Marketplace (or manually). There is no `config.js` and **no access token to paste anywhere**. If you are on v4.x, read [Upgrading from v4.x](#upgrading-from-v4x) first. Your settings can be imported in one click.

## What's new in v5.0

- 🔐 **No token in a file.** Homie signs in with your logged-in Home Assistant session.
- 🧙 **Setup wizard.** Pick your lights, scenes, climate, cameras, weather, alarm, music players and calendars from your own Home Assistant. No code editing.
- 💾 **Updates never overwrite your setup.** Your choices live inside Home Assistant, not in the downloaded files.
- 📥 **One-click import** of your v4 `config.js`.
- 🖼️ **Photos are detected automatically.** Drop images in a folder, no filename lists.

## Quick Start

1. **Install** Homie Dashboard from **Settings → Marketplace** (Home Assistant 2026.11 or newer) or install it manually. See [Installation](#installation). Restart Home Assistant if it asks you to.
2. **Settings → Devices & services → Add integration → Homie Dashboard**.
3. Open **Homie** in the sidebar. The setup wizard starts automatically.

## Screenshots

*The screenshots show a demo home with made-up devices and generated placeholder pictures for the photo frame, cameras and car.*

### Overview

| Overview Screen A | Overview Screen B | Overview Screen C |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/overview-a.jpg" alt="Overview Screen A" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/overview-b.jpg" alt="Overview Screen B" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/overview-c.jpg" alt="Overview Screen C" width="320" height="200"/> |

### Dashboards

| Now Playing A | Now Playing B | My Day |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/now-playing-a.jpg" alt="Now Playing A" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/now-playing-b.jpg" alt="Now Playing B" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/my-day.jpg" alt="My Day" width="320" height="200"/> |

| Memories | Thermostat | Weather |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/memories.jpg" alt="Memories" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/thermostat.jpg" alt="Thermostat" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/weather.jpg" alt="Weather" width="320" height="200"/> |

| Weather forecast | Clock A | Clock B |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/weather-forecast.jpg" alt="Weather forecast" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/clock-analog.jpg" alt="Clock A" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/clock-digital.jpg" alt="Clock B" width="320" height="200"/> |

| Solar | Cameras | Indoor AQI |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/solar.jpg" alt="Solar" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/cameras.jpg" alt="Cameras" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/indoor-aqi.jpg" alt="Indoor AQI" width="320" height="200"/> |

| Indoor Presence | Calendar | Car (BMW CarData) |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/indoor-presence.jpg" alt="Indoor Presence" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/calendar.jpg" alt="Calendar" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/car.jpg" alt="Car" width="320" height="200"/> |

| Insights | Dashboards hub | Settings |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/insights.jpg" alt="Insights" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/dashboards-hub.jpg" alt="Dashboards hub" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/settings.jpg" alt="Settings" width="320" height="200"/> |

### Entities and other screens

| Pet Stats | Alarm | Lights |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/pet.jpg" alt="Pet Stats" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/alarm.jpg" alt="Alarm" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/lights.jpg" alt="Lights" width="320" height="200"/> |

| Scenes | Air Con | Purifiers |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/scenes.jpg" alt="Scenes" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/aircon.jpg" alt="Air Con" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/purifiers.jpg" alt="Purifiers" width="320" height="200"/> |

| Blinds | Switches | Plants |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/blinds.jpg" alt="Blinds" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/switches.jpg" alt="Switches" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/plants.jpg" alt="Plants" width="320" height="200"/> |

## Themes

| Classic Gold | Deep Copper | Terracotta |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-gold.jpg" alt="Classic Gold" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-copper.jpg" alt="Deep Copper" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-terracotta.jpg" alt="Terracotta" width="320" height="200"/> |

| Steel Blue | Arctic Cyan | Emerald Green |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-blue.jpg" alt="Steel Blue" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-cyan.jpg" alt="Arctic Cyan" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-emerald.jpg" alt="Emerald Green" width="320" height="200"/> |

| Amethyst Purple | Solar Yellow | Crimson Red |
|--------|--------|--------|
| <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-amethyst.jpg" alt="Amethyst Purple" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-yellow.jpg" alt="Solar Yellow" width="320" height="200"/> | <img src="https://raw.githubusercontent.com/Big-Edge2297/homie-dashboard/main/docs/screenshots/theme-crimson.jpg" alt="Crimson Red" width="320" height="200"/> |

---
## Installation

**Requirements:** Home Assistant 2025.1 or newer. The tablet (or any device) must be signed in to Home Assistant, which is normal for the Companion app or a browser you have logged in.

Choose **one** of the options below, then continue with [Add the integration](#add-the-integration).

<details open>
<summary><b>Option A: Marketplace (recommended)</b>: Home Assistant 2026.11 or newer</summary>

1. Open **Settings → Marketplace** in Home Assistant. The first time, accept the warning about community integrations.
2. Search for **Homie Dashboard** and click **Install**.
3. If Home Assistant asks for a restart (a repair appears under **Settings → System → Repairs**), restart it. Otherwise the setup page opens straight away.

You do not need a GitHub account to install from the catalog. Updates appear under **Settings → Updates**, and still need a restart.

</details>

<details>
<summary><b>Option B: Manual installation</b>: any version, and the way to install on Home Assistant 2026.10 or older</summary>

1. Download **homie_dashboard.zip** from the latest release on the [Releases page](https://github.com/Big-Edge2297/homie-dashboard/releases).
2. Create the folder `config/custom_components/homie_dashboard/` and extract the zip into it. You should end up with `config/custom_components/homie_dashboard/manifest.json`.
3. **Restart Home Assistant**.

If you downloaded the source code instead (**Code → Download ZIP**, or the *Source code* file of a release), copy the folder `custom_components/homie_dashboard` from it into `config/custom_components/` instead.

To update later, repeat the steps and overwrite the folder. Your setup is stored separately inside Home Assistant, so it is kept.

</details>

### Add the integration
1. Settings → Devices & services → **Add integration**.
2. Search for **Homie Dashboard**.
3. Choose the sidebar title and icon (you can change these later from the integration's **Configure** button) and submit.
4. A new item appears in the sidebar. Open it and the [setup wizard](#setup-wizard) walks you through the rest. You do **not** need to create a dashboard yourself.
5. If a wall tablet was already open, reload the page. In the Companion app clear the app **cache** (not storage), or just restart the app.

---
## Setup wizard

<details>
<summary><b>Show the setup wizard steps</b></summary>

The wizard opens automatically the first time, and any time later from **Settings → About → Open setup** inside the dashboard.

The steps are grouped into six sections along the top. A section with several steps shows them as a second row of tabs, sorted A to Z. **Back** and **Next** move through every step in the order below.

| Section | Tab | What you choose |
|---|---|---|
| 1. Welcome | Welcome | Import your v4 `config.js` (optional), backup & restore |
| 2. General | Alexa timers | Live countdown for Echo timers |
| 2. General | Floor Sensors | One panel per floor with temperature, humidity, air quality and PM2.5 readings |
| 2. General | Greeting | Start hour and text of each greeting |
| 2. General | Home Stats | The stat tiles on the overview: any entity, shown as a value with a unit or as on/off words |
| 2. General | Notifications | Messages at the top of the overview while an entity is on |
| 2. General | Travel Time | Journey times shown on the days and hours you choose |
| 3. Pills | Bath | Bathroom toggles (water heater, fans, towel warmers) in optional sections |
| 3. Pills | Blinds | Blinds and curtains |
| 3. Pills | Climate | Air con and purifiers |
| 3. Pills | Lights | Which lights to show, grouped by your Home Assistant **areas** |
| 3. Pills | Plants | Plant moisture sensors and irrigation switches |
| 3. Pills | Scenes | Your scenes (icons and colours picked from the name) |
| 3. Pills | Switches | Switches, on/off helpers and automations |
| 4. Dashboards | Air Quality | Outdoor AQI and pollutant sensors, the colours and wording of the outdoor air quality levels, and the rooms and sensors of the Indoor AQI screen |
| 4. Dashboards | Alarm | Alarm panel and code, the Alarm screen status groups, siren and garage buttons |
| 4. Dashboards | Calendar | Calendars and the meal calendar |
| 4. Dashboards | Cameras | Up to 6 cameras, motion sensors (suggested automatically), a doorbell and camera behaviour |
| 4. Dashboards | Car | Optional: the sensors for the Car dashboard |
| 4. Dashboards | Music | Music players and how long the player bar stays |
| 4. Dashboards | My Day | The four meal slots (label, icon, hour, order), the daily habit bubbles, the mood picker, and habits and mood sync |
| 4. Dashboards | Pet | Pet name, litter box, feeder and water fountain entities, and the litter chart colours |
| 4. Dashboards | Presence | Person and animal detection sensors per room for the Indoor Presence timeline |
| 4. Dashboards | Solar | Live power flow, hourly and daily charts, and the Solar panel in the overview sensor row |
| 4. Dashboards | Weather | Weather entity, sunrise/sunset and moon phase |
| 5. Advanced | Advanced | Only settings that have no step (from an older or custom config) as JSON, and Reset everything. Normally there is nothing to edit here |
| 6. Review & Save | Review & Save | Check and save |

You need a Home Assistant **administrator** account to change the setup. Other users (for example a dedicated tablet user) can view and use the dashboard.

</details>

### Photos and backgrounds
Copy images (`jpg`, `jpeg`, `png`, `webp`, `gif`) to these folders on your Home Assistant server. They are detected automatically and shown to signed-in users only; reload the dashboard after adding files.

| Folder | Used for |
|---|---|
| `/config/homie_dashboard/photos/` | Photo frame (Memories) |
| `/config/homie_dashboard/photos/background/` | Overview background pictures (Settings → Background) |
| `/config/homie_dashboard/car/` | Picture of your car for the Car dashboard (PNG with a transparent background) |

The folders are created for you when the integration starts.

---
## Kiosk Satellite setup and automations

Run Homie on a wall tablet with Kiosk Satellite and open any screen from a Home Assistant automation, for example Now Playing when music starts.

**[Open the Kiosk Satellite guide →](docs/kiosk-satellite.md)** It covers installing and connecting Kiosk Satellite, the Home Assistant commands and automations (open Now Playing when music plays, screen on with a presence sensor), and the `?screen=` deeplinks for every dashboard.

---
## Upgrading from v4.x

<details>
<summary><b>Show the upgrade steps</b></summary>

Your v4 settings can be imported, but **removing the old entry deletes the old files**, so do these steps in order:

1. **Keep a copy of `config.js`.** Download or copy `config/www/community/homie-dashboard/config.js` (or wherever yours is).
2. In the **Marketplace** (or **HACS** on Home Assistant 2026.10 or older), remove the old *Homie Dashboard* entry (it was added with type *Dashboard*).
3. Install the new version using any option in [Installation](#installation) (it is an **Integration**, not a Dashboard), then restart Home Assistant.
4. Add the **Homie Dashboard** integration. In the wizard's first step choose **Choose config.js…** and select your saved file. (If the old file is still in `www`, the wizard finds it and offers a one-click **Import it**.)
5. Check each step, then **Save & open dashboard**.
6. **Clean up:**
   - Delete the old *Webpage* dashboard (Settings → Dashboards) that pointed to `/local/…homie-dashboard.html`.
   - Delete the old resource `/local/community/homie-dashboard/homie-dashboard.js` (Dashboards → ⋮ → Resources).
   - Delete any leftover `config.js` copies.
   - **Revoke the old Long-Lived Access Token** (Profile → Security → Long-Lived Access Tokens). It is no longer needed.

The token inside your old `config.js` is **never** read or stored by the importer. Your dashboard preferences (theme, fonts, gestures…) stay on each device and carry over automatically.

Prefer to stay on the old version? It remains available as release [v4.3.0](https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v4.3.0) and on the `legacy-4.x` branch.

</details>

---
## Security

<details>
<summary><b>Show how Homie keeps your home secure</b></summary>

- **No access token is stored anywhere.** Homie uses the short-lived session token of the Home Assistant user that is signed in, refreshed automatically.
- Your selections are stored in Home Assistant's private `.storage` folder, not in a file served over the web.
- **The alarm code never reaches the browser.** If you save one in the wizard, it is kept privately in Home Assistant and added by the server when someone arms or disarms. Home Assistant does not send it to any page, not even to administrators, and the wizard only shows whether one is saved. By default only administrators can use the saved code and other users are asked for the PIN; a wizard option lets non-administrator users, such as a wall-tablet user, use it too. If you leave the code empty, the dashboard asks for a PIN every time.
- **Photos require authentication.** Pictures in `/config/homie_dashboard/photos/` are served through an authenticated endpoint. The dashboard receives time-limited signed links (valid for 12 hours, tied to the signed-in session, refreshed automatically), so someone who can only reach your instance URL cannot download them.
- **No third-party requests.** All fonts are bundled with the integration, so nothing is loaded from Google. The only outside request is the dashboard's check for a newer Homie release on GitHub.
- The dashboard is only reachable by signed-in Home Assistant users. You can restrict it to administrators in the integration's **Configure** options.
- **Anything you set in the wizard is escaped** before it is shown (names, labels, icons, colours, entity states), so a value that contains markup is displayed as text and never runs.
- **Camera streams use no public server.** When Home Assistant provides none, Homie does not fall back to a third-party STUN server, so your tablet's address is not sent to anyone. If you watch cameras from outside your network and need one, add your own under **Own STUN or TURN servers** in the wizard's **Cameras** step.
- For remote access use a VPN (e.g. WireGuard) or Home Assistant Cloud. Never expose Home Assistant to the internet without proper protection.

</details>

---
## Troubleshooting

<details>
<summary><b>Show common problems and fixes</b></summary>

| Problem | Fix |
|---|---|
| "Open Homie Dashboard from Home Assistant" | Open **Homie** from the HA sidebar instead of a direct address. |
| Wizard says setup needs an administrator | Sign in with an admin account to change the setup. |
| Entities missing in the wizard | Entities hidden or marked as config/diagnostic in HA are not listed. Unhide them in Home Assistant. |
| Old settings didn't import | Make sure you chose your v4 `config.js` (not the HTML file). |
| Blank page after updating | Reload; on the Companion app clear the cache (Settings → Companion app → Troubleshooting). |
| A tablet gets IP-banned ("Banned IP … for too many login attempts") | Fixed in 5.1.1: the dashboard now checks its session token before every request, so a tablet waking from sleep no longer sends an expired one. Update, then unban the device: remove its address from `/config/ip_bans.yaml` and restart Home Assistant. |
| A camera does not play when I am away from home | Streams on your own network need nothing extra. From outside your network a stream may need a STUN or TURN server: in the wizard's **Cameras** step add one under **Own STUN or TURN servers**, for example `stun:stun.example.com:3478`. |
| A `?screen=` link opens the overview | Check the name against [the list](docs/kiosk-satellite.md#1-test-the-deeplinks-first) (an unknown name is ignored) and that you are signed in. `car` only works once a car sensor is chosen. After updating, reload the page or clear the Companion app cache. |
| No **Car** button in the Dashboards hub | The button appears once at least one sensor is chosen in the wizard's **Car** step, and it can be turned off under Settings. |
| Photos or the car picture do not show | Check the folder and file type (`jpg`, `jpeg`, `png`, `webp`, `gif`), then reload the dashboard. Pictures are only shown to signed-in users. |
| Tablet automations (Kiosk Satellite) do not work | See the [Kiosk Satellite guide](docs/kiosk-satellite.md#troubleshooting). |
| "Home Assistant session expired" | Reload the page. If it repeats, sign out and back in on that device. |

</details>

---
## Contributing & license

Issues and pull requests are welcome. To report a security problem privately, see [SECURITY.md](SECURITY.md). Released under the [MIT License](LICENSE).
