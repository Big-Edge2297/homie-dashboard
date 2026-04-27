# **Homie Dashboard**

A custom Home Assistant dashboard built for wall-mounted tablets. 

I created this dashboard with the design philosophy of a single page overview for accessing the most important functions and controls of my house. I also wanted to make the look and feel of a luxury hotel, making everything 
easily configurable in one HTML file.

Homie connects directly to Home Assistant over a Long-Lived Access Token and a local WebSocket connection which results in automatic caching of state_changed event.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-compatible-41BDF5?logo=home-assistant&logoColor=white)


| Main Screen | Notifications and Music | Hero Stats and Chips ON |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/9f0ec5ae-6562-4acc-8654-293e06bf4f51" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/f2ef40ab-823f-4208-8442-093ab6a1a8e6" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/80db17b8-478c-40e4-9a8f-1fc0accca713" width="320" height="200"/> |


| Pet Stats | Calendar | AirCon |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/00381443-7d68-43f9-8296-f20299ad74eb" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/7a1326ec-3ab9-45fe-9d88-49359db6c760" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/2cf69c21-d577-4fd3-8124-47b28d65d1bb" width="320" height="200"/> |


---

## Main Screen Elements

**Top bar - Left**
- Dashboard name
- Live clock and date, updated every second

**Top bar - Middle**
- Weather widget — icon, temperature, and condition from your HA weather entity

**Top bar - Right**
- SHUMI button — pet stats popup (litter box, feeder, water fountain, litter box usage)
- CALENDAR button — upcoming events from multiple HA calendar entities

**Notification - Middle 1/3**
- Hidden notifications from multiple HA `binary_sensor` or `input_boolean`. Useful for reminders like cat maintenance, vitamins not taken, or coffee to prepare for tomorrow.

**Hero area - Middle Center**
- Full-bleed background image
- Time-aware greeting — Good Morning / Good Afternoon / Good Evening / Good Night
- Home stats grid — up to 10 entity-driven tiles in a 5-column layout

**Now Playing Bar - Middle 2/3**
- When a HA media player is playing, a slim bar slides up from the bottom showing artist, track name, previous/play-pause/next controls, and a live progress bar updated every 2 seconds.
- When nothing is playing the player is hidden
- When music is paused or stops, the players dissappears after a few seconds

**Sensor row - Bottom Pills**
- Floor sensor pill — temperature, humidity, and PM2.5 for up to two floors
- Solar pill — production (kW), today's energy consumption, export (kW), battery state of charge (%), and inverter temperature

**Controls row**
- Chip buttons for each control group (Lights, Scenes, Air Con, Purifiers, Blinds, Bath, Irrigation)
- Active-count badge on each chip (e.g. "3 on")


## Other Features

- Fullscreen on first tap
- No pinch-zoom, no text selection
- Haptic Feedback

  On Android devices that support the Vibration API, every interaction produces a vibration matched to the action:

  | Intensity | Pattern | When It Fires |
  |---|---|---|
  | `light` | 18 ms | Open/close popups, accordion expand, media controls |
  | `medium` | 35 ms | Toggle lights, switches, chips on/off; select AC mode |
  | `heavy` | 30–60–50 ms (double-tap) | AC power, purifier power, fire a scene |

  Silently does nothing on unsupported devices

- Control Popups

  Tapping a chip opens a modal popup with detailed controls. The card type is determined automatically by the entity domain:
  | Entity Domain | Card Type & Controls |
  |---|---|
  | `light.*` | Brightness slider + colour presets + colour-temperature (Warm / Neutral / Cool) |
  | `climate.*` | AC card — power toggle, mode (cool/heat/fan/dry), fan speed, temperature nudge |
  | `cover.*` | Blind/curtain card — open, stop, close + position slider. Add `isCurtain: true` for side-pull curtains |
  | `fan.*` | Air purifier card — power toggle + fan-speed percentage slider |
  | `switch.*` / `input_boolean.*` | Simple on/off toggle |
  | `group.*` | Simple toggle (no card controls) |

- Popups with many entities use a room accordion — tap a room to expand it, tap outside to dismiss.

- State cache
  
  `stateCache` is a JavaScript `Map` keyed by `entity_id` — the single source of truth for all rendering. All UI functions read from this cache synchronously; they never make network requests during a render cycle.

- Fallback polling
  
  A `setInterval` fires every 15 seconds. When the WebSocket is healthy, `refreshStateCache()` returns immediately with zero network traffic. It only becomes a real HTTP poll when the WebSocket is disconnected.

- Rendering flow
  
  Every `state_changed` event triggers `refreshAllUI()`, which synchronously updates the hero stats, sensor row, weather widget, chip states, notification banner, and Now Playing bar. The entire cycle typically completes in under 1 ms.

## Architecture

### WebSocket flow

1. Dashboard opens WebSocket  
2. HA sends auth_required
3. Dashboard sends token
4. HA sends auth_ok
5. Dashboard sends get_states + subscribe_events(state_changed)
6. get_states seeds stateCache (Map of entity_id → state)
7. Each state_changed event patches one cache entry + re-renders UI


## Requirements

- Home Assistant 2023.x or newer
- A Long-Lived Access Token — generate one at HA → Profile → Long-Lived Access Tokens
- A websocket url ws://YOUR_HA_IP:8123/api/websocket
- Same local network as your HA instance (the WebSocket is a local connection)
- Any modern browser — Chrome, Edge, Firefox, Safari
- Haptic feedback requires A DEVICE supporting the Vibration API

## Security

⚠️ The HA Long-Lived Access Token is stored in plain text inside the HTML file. Anyone who can read the file has full access to your Home Assistant instance.

**Recommendations:**
- Serve the file only on your local network — never expose it to the internet without authentication
- Create a dedicated HA user account for the dashboard token rather than using your personal admin account so you can limit access and exposure
- Revoke and regenerate the token periodically (HA → Profile → Long-Lived Access Tokens)
- For remote access, use a VPN (e.g. WireGuard)

---

## Setup

### 1. Generate a Long-Lived Access Token

1. Open Home Assistant and go to your Profile
2. Scroll to **Long-Lived Access Tokens** and click **Create Token**
3. Give it a name (e.g. `Homie Dashboard`) and click OK
4. Copy the token immediately — HA will not show it again

### 2. Set the WebSocket URL and Token

Open `homie-dashboard.html` in a text editor and find these two constants near the top of the `<script>` section:

```js
const WS_URL   = "ws://YOUR_HA_IP:8123/api/websocket";
const HA_TOKEN = "paste-your-token-here";
```
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

Copy the file to `/config/www/homie-dashboard.html` on your HA server and open:
```
http://YOUR-HA-IP:8123/local/homie-dashboard.html
```

### 5. Create a new dashboard in HA for easy access on the side panel

Settings -> Add Dashboard -> Webpage and add http://YOUR-HA-IP:8123/local/homie-dashboard.html

Copy the file to `/config/www/homie-dashboard.html` on your HA server and open:
```
http://YOUR-HA-IP:8123/local/homie-dashboard.html
```

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

