# Homie Dashboard

A custom Home Assistant dashboard built for wall-mounted tablets. Single-file, config-driven, and real-time — no build step, no framework, no separate server.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-compatible-41BDF5?logo=home-assistant&logoColor=white)
![WebSocket](https://img.shields.io/badge/connection-WebSocket-brightgreen)
![Single File](https://img.shields.io/badge/deployment-single%20file-gold)

---

## Overview

Homie connects directly to Home Assistant over a local WebSocket connection. State changes — a light turning on, a door opening, a song starting — appear on the dashboard within milliseconds, with no page refresh and no cloud dependency.

Everything lives in one HTML file. Edit a single `CONFIG` object at the top of the `<script>` section to make it your own.

**Design principles:**
- **Single file** — copy one file, serve it anywhere, done
- **Config-driven** — every room, sensor, scene, and entity is defined in `CONFIG`, no code changes needed for day-to-day customisation
- **Real-time** — WebSocket push from Home Assistant, state changes appear in under 100 ms
- **Tablet-first** — layout and touch targets tuned for landscape orientation on a 10–13 inch wall tablet
- **Graceful degradation** — if the WebSocket drops, a fallback REST poll keeps the UI updated and a visible banner shows the connection is recovering

---

## Features

### Overview Screen

**Hero area**
- Full-bleed background image (configurable URL)
- Time-aware greeting — Good Morning / Good Afternoon / Good Evening / Good Night
- Home stats grid — up to 10 entity-driven tiles (e.g. Doors: Closed, Alarm: Armed, Lights: On) in a 5-column layout

**Top bar**
- Live clock and date, updated every second
- Weather widget — icon, temperature, and condition from your HA weather entity
- SHUMI button — pet stats popup (litter box, feeder, water fountain)
- CALENDAR button — upcoming events from multiple HA calendar entities

**Sensor row**
- Floor sensor panels — temperature, humidity, and PM2.5 for up to two floors
- Power pill — today's energy consumption
- Solar pill — production (kW), export (kW), battery state of charge (%), and inverter temperature

**Controls row**
- Chip buttons for each control group (Lights, Scenes, Air Con, Purifiers, Blinds, Bath, Irrigation, and any custom groups)
- Active-count badge on each chip (e.g. "3 on")
- Chips without sub-entities toggle their master entity directly

### Control Popups

Tapping a chip opens a modal popup with detailed controls. The card type is determined automatically by the entity domain:

| Entity Domain | Card Type & Controls |
|---|---|
| `light.*` | Brightness slider + colour presets + colour-temperature (Warm / Neutral / Cool) |
| `climate.*` | AC card — power toggle, mode (cool/heat/fan/dry), fan speed, temperature nudge |
| `cover.*` | Blind/curtain card — open, stop, close + position slider. Add `isCurtain: true` for side-pull curtains |
| `fan.*` | Air purifier card — power toggle + fan-speed percentage slider |
| `switch.*` / `input_boolean.*` | Simple on/off toggle |
| `group.*` | Simple toggle (no card controls) |

Popups with many entities use a room accordion — tap a room to expand it, tap outside to dismiss.

### Scenes

The Scenes chip opens a grid of coloured bubble buttons, each mapped to a HA automation. Scenes are grouped by room, each with a custom colour and icon. Tapping fires the automation and plays a flash animation for confirmation.

### Now Playing Bar

When a HA media player is playing, a slim bar slides up from the bottom showing artist, track name, previous/play-pause/next controls, and a live progress bar updated every 2 seconds.

### Notification Banner

A persistent banner appears when any configured `binary_sensor` or `input_boolean` is `on`. Useful for reminders like cat maintenance, vitamins not taken, or coffee to prepare for tomorrow.

### WebSocket Connection

On startup the dashboard:
1. Opens a WebSocket to your HA instance and authenticates with your token
2. Fetches all entity states in one bulk `get_states` request
3. Subscribes to `state_changed` events for instant push updates
4. Falls back to a REST poll every 15 seconds if the WebSocket disconnects

Service calls (turning things on/off) use the REST API — clean, stateless, and simple. The resulting `state_changed` event updates the cache automatically.

### Haptic Feedback

On devices that support the Vibration API (Android tablets), every interaction produces a vibration matched to the action:

| Intensity | Pattern | When It Fires |
|---|---|---|
| `light` | 18 ms | Open/close popups, accordion expand, media controls |
| `medium` | 35 ms | Toggle lights, switches, chips on/off; select AC mode |
| `heavy` | 30–60–50 ms (double-tap) | AC power, purifier power, fire a scene |

Silently does nothing on unsupported devices (desktop, iOS Safari).

### Pet Stats Popup

Three stat cards plus a 5-day litter history chart:
- **Litter box** — visits today and time since last use
- **Food** — portions dispensed, total weight (grams), desiccant days remaining
- **Water fountain** — purified volume today and filter life remaining (%)

Works with any smart litter box, feeder, and water fountain that exposes sensors in HA.

### Tablet UX

- Auto-fullscreen on first tap
- No pinch-zoom, no text selection, no iOS callout menus
- Cormorant Garamond serif for the clock and title; Montserrat for all other text
- Gold accent (`#B8965C`), dark background (`#0D0D0D`), glass-style overlays

---

## Requirements

- **Home Assistant** 2023.x or newer
- **A Long-Lived Access Token** — generate one at HA → Profile → Long-Lived Access Tokens
- **Same local network** as your HA instance (the WebSocket is a local connection)
- **Any modern browser** — Chrome, Edge, Firefox, Safari
- **Haptic feedback** requires Android or any browser supporting the Vibration API

---

## Setup

### 1. Generate a Long-Lived Access Token

1. Open Home Assistant and go to your Profile
2. Scroll to **Long-Lived Access Tokens** and click **Create Token**
3. Give it a name (e.g. `Homie Dashboard`) and click OK
4. Copy the token immediately — HA will not show it again

> **Security note:** The token is stored in plain text inside the HTML file. Keep the file private. See [Security](#security) below.

### 2. Set the WebSocket URL and Token

Open `homie-dashboard.html` in a text editor and find these two constants near the top of the `<script>` section:

```js
const WS_URL   = "ws://192.168.10.2:8123/api/websocket";
const HA_TOKEN = "paste-your-token-here";
```

- Replace `192.168.10.2` with the local IP of your Home Assistant instance
- Replace the `HA_TOKEN` string with the token from Step 1

### 3. Configure the Dashboard

All customisation is in the `CONFIG` object immediately below `HA_TOKEN`. Every section has inline comments. Work through them in order:

#### Welcome greeting
Auto-generated from the time of day. Adjust the hour ranges if your schedule differs from the defaults.

#### Music player
```js
musicEntity: "media_player.your_spotify_entity",
```

#### Calendar
```js
calendarEntities: ["calendar.your_calendar_1", "calendar.your_calendar_2"],
```

#### Home stats grid
Up to 10 tiles in the hero area. Each entry needs:

| Key | Example | Description |
|---|---|---|
| `label` | `"Doors"` | Display name |
| `entity` | `"binary_sensor.all_doors"` | HA entity to read |
| `onValue` | `"Open"` | Text when state is on/open |
| `offValue` | `"Closed"` | Text when state is off/closed |

#### Weather
```js
weather: { entity: "weather.forecast_home", tempUnit: "°C" }
```
Change `tempUnit` to `"°F"` if needed.

#### Sensor row
`floorSensors` takes `ground` and `upper` floors, each with `temp`, `humidity`, and `pm25` entity IDs. Set `decimal: true` to show one decimal place.

`powerSensor` is a single energy entity. `solarSensors` takes four entities: `production`, `export`, `battery`, and `temp`. Remove the `solarSensors` block entirely if you don't have solar panels.

#### Background image
```js
backgroundImage: "https://images.unsplash.com/photo-xxxx?w=1200&q=80",
```
Any image URL works. For a locally-hosted image: `http://YOUR-HA-IP:8123/local/my-photo.jpg`

#### Controls (chip buttons)
Each entry becomes a chip. Key properties:

| Key | Example | Description |
|---|---|---|
| `label` | `"Lights"` | Chip button text |
| `entity` | `"light.all_lights"` | Master entity the chip toggles (`null` for popup-only) |
| `showCount` | `true` | Show a "3 on" badge |
| `countEntity` | `"sensor.lights_on_count"` | Optional HA sensor providing the active count directly |
| `subEntities` | `[{label, entity}]` | Flat list of entities in the popup |
| `subGroups` | `[{label, subEntities}]` | Grouped entities with accordion headers |
| `noRoomGrouping` | `true` | Skip accordion, show flat list |
| `isSceneChip` | `true` | Render scene bubbles instead of toggle cards |
| `isCurtain` | `true` | On a `cover` sub-entity: flip open/close arrow for side-pull curtains |
| `expandable` | `true` | On a sub-entity: make it an inline expandable group |

#### Notifications
```js
notifications: [
  { label: "Cat Maintenance",    entity: "binary_sensor.cat_maintenance" },
  { label: "Take Your Vitamins", entity: "input_boolean.vitamins_taken" },
]
```

#### Pet stats
Seven entity IDs mapping to your litter box, feeder, and water fountain sensors. Remove the SHUMI button from the HTML if you don't have a cat (search for `cat-btn`).

### 4. Deploy

**Option A — Serve from HA:**
Copy the file to `/config/www/homie-dashboard.html` on your HA server and open:
```
http://YOUR-HA-IP:8123/local/homie-dashboard.html
```

**Option B — Open directly:**
Open the file in a browser on any device connected to the same local network as HA. No server needed.

Tap the screen once to enter fullscreen mode.

> **Tip:** On Android, use Chrome → three-dot menu → **Add to Home Screen** for a fullscreen launcher icon. On iOS, use Safari → Share → **Add to Home Screen**.

---

## Customisation

### Adding a new chip

Minimal toggle chip:
```js
{ label: "Garden", entity: "switch.garden_lights", on: false }
```

Chip with popup:
```js
{ label: "Garden",
  entity: "switch.all_garden",
  on: false,
  showCount: true,
  subEntities: [
    { label: "Front Path",  entity: "switch.garden_path_front" },
    { label: "Rear Patio",  entity: "switch.garden_patio_rear" },
  ] }
```

### Adding a new scene

Add to the `isSceneChip` control under `subGroups`:
```js
{ label: "Study",
  entity: "automation.study_focus_mode",
  color: "#1a3a5c",
  icon: `<svg width="18" height="18" .../>` }
```
`entity` must be a HA automation. `icon` is an inline SVG string — any 18×18 px Heroicons or Feather Icons SVG works.

### Adding a notification
```js
{ label: "Water filter needs replacing", entity: "binary_sensor.water_filter_due" }
```

### Adjusting haptic intensities

Find `HAPTIC_PATTERNS` near the top of the script:
```js
const HAPTIC_PATTERNS = {
  light:  [18],
  medium: [35],
  heavy:  [30, 60, 50],  // [on, pause, on] double-tap
};
```
Values are in milliseconds. Set all to `[1]` to effectively disable haptics without removing the code.

---

## Architecture

### WebSocket flow

```
Dashboard opens WebSocket
  → HA sends auth_required
  → Dashboard sends token
  → HA sends auth_ok
  → Dashboard sends get_states + subscribe_events(state_changed)
  → get_states seeds stateCache (Map of entity_id → state)
  → Each state_changed event patches one cache entry + re-renders UI
```

### State cache

`stateCache` is a JavaScript `Map` keyed by `entity_id` — the single source of truth for all rendering. All UI functions read from this cache synchronously; they never make network requests during a render cycle.

### Fallback polling

A `setInterval` fires every 15 seconds. When the WebSocket is healthy, `refreshStateCache()` returns immediately with zero network traffic. It only becomes a real HTTP poll when the WebSocket is disconnected.

### Rendering flow

Every `state_changed` event triggers `refreshAllUI()`, which synchronously updates the hero stats, sensor row, weather widget, chip states, notification banner, and Now Playing bar. The entire cycle typically completes in under 1 ms.

---

## Troubleshooting

**Connection Lost banner is always visible**
- Check `WS_URL` matches your HA IP and port
- Confirm the device is on the same local network as HA
- Verify `HA_TOKEN` is correct and hasn't been revoked

**Sensors show `—` instead of values**
- Double-check the `entity_id` in HA → Developer Tools → States
- The entity may have an `unavailable` or `unknown` state in HA

**A chip toggle does nothing**
- Check the `entity_id` in the `controls` array
- Open DevTools (F12) and check the browser console for errors

**Wrong card type in a popup**
- Card type is determined by the entity domain (the part before the dot)
- Verify the `entity_id` starts with the correct domain in HA → Developer Tools → States

**Haptic feedback not working**
- iOS does not support the Vibration API — haptic is unavailable on iPhones and iPads
- On Android, a user gesture must occur first — tap the screen once

**Now Playing bar not appearing**
- Confirm `musicEntity` is a valid `media_player` entity
- The bar only appears when the player state is `playing`

**Calendar shows an error**
- Verify entity IDs in `calendarEntities` are correct
- Check that the Calendar integration is configured in HA

---

## Security

> ⚠️ The HA Long-Lived Access Token is stored in plain text inside the HTML file. Anyone who can read the file has full access to your Home Assistant instance.

**Recommendations:**
- Serve the file only on your local network — never expose it to the internet without authentication
- Add the file to `.gitignore` or strip the token before committing to a repository
- Create a dedicated HA user account for the dashboard token rather than using your personal admin account
- Revoke and regenerate the token periodically (HA → Profile → Long-Lived Access Tokens)
- For remote access, use a VPN (e.g. WireGuard via the HA VPN add-on) rather than exposing port 8123

---

## Quick Reference

### Files to edit

| Location | What to change |
|---|---|
| `WS_URL` near top of `<script>` | WebSocket address of your HA instance |
| `HA_TOKEN` near top of `<script>` | Your Long-Lived Access Token |
| `CONFIG` object | All rooms, sensors, controls, and scenes |
| `cat-overlay` in the HTML body | Pet stats popup labels |

### Useful HA Developer Tools

- **States** — look up exact `entity_id` values and their current states
- **Template** — test template expressions and sensor values
- **Events** — watch `state_changed` events in real time to verify entity names

### CONFIG sections at a glance

| Key | Description |
|---|---|
| `welcomeText` | Time-aware greeting (auto, no changes needed) |
| `musicEntity` | HA media player for the Now Playing bar |
| `calendarEntities` | Calendar entities for the CALENDAR popup |
| `homeStats` | Hero grid tiles (up to 10) |
| `weather` | HA weather entity and °C / °F preference |
| `floorSensors` | Temp, humidity, PM2.5 per floor |
| `powerSensor` | Energy consumption pill |
| `solarSensors` | Solar production, export, battery, inverter temp |
| `backgroundImage` | Hero background image URL |
| `controls` | Chip buttons and their popup contents |
| `notifications` | Notification banner entities |
| `petStats` | Entities for the SHUMI pet stats popup |
