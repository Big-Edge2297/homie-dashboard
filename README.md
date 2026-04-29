# **Homie Dashboard**

A custom Home Assistant dashboard built for wall-mounted tablets. 

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-compatible-41BDF5?logo=home-assistant&logoColor=white)

I created this dashboard with the design philosophy of a single page overview for accessing the most important functions and controls of my house easily. 

Homie connects directly to Home Assistant over a Long-Lived Access Token and a local WebSocket connection which results in automatic caching.

⚠️ The HA Long-Lived Access Token is stored in plain text inside the HTML file. Anyone who can read the file has full access to your Home Assistant instance.

**Recommendations:**
- Serve the file only on your local network — never expose it to the internet without authentication
- Create a dedicated HA user account for the dashboard token rather than using your personal admin account so you can limit access and exposure
- Revoke and regenerate the token periodically (HA → Profile → Long-Lived Access Tokens)
- For remote access, use a VPN (e.g. WireGuard)

## Dashboard Screenshots

| Main Screen | Notifications and Music | Hero Stats and Chips ON |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/8a71b8aa-357a-483f-8859-de8fd860cd7d" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/ef6800e8-6a9a-4a67-b3db-3a818be73bde" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/20425167-f397-4ad8-8ae0-7a3ab3728fc7" width="320" height="200"/> |

| Pet Stats | Calendar | AirCon |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/00381443-7d68-43f9-8296-f20299ad74eb" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/7a1326ec-3ab9-45fe-9d88-49359db6c760" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/2cf69c21-d577-4fd3-8124-47b28d65d1bb" width="320" height="200"/> |

| Lights | Scenes | Blinds |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/79b52001-6b85-4a4f-96f4-0332dfe05f2d" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/404c87ef-6105-49bd-b12b-1d7c6eadfb5f" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/8107d615-41be-457a-9f91-c3e674a654d0" width="320" height="200"/> |

| ... and Shumi 🐱 |
|--------|
| <img src="https://github.com/user-attachments/assets/2b4c66f6-2b31-4a11-b967-55e7fc3f4b0a" width="246" height="428"/> |

## Theme Screenshots

| Classic Gold | Deep Copper | Terracotta |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/c4540dd0-5587-4311-a86d-c6fa46e4bd13" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/1b520f68-749a-4581-b947-a426100b0d56" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/505a33c0-e390-462b-b5c8-724e7f24b1e3" width="320" height="200"/> |

| Steel Blue | Arctic Cyan | Emerald Green |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/436021d8-ca68-4d8a-8bfe-96fe0fff24de" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/1e8a56ad-5843-4a8d-b85e-4b834ec077b6" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/f8957b61-d8f0-45e8-a76b-62658345831d" width="320" height="200"/> |

| Amethyst Purple | Solar Yellow | Crimson Red |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/dcf892cc-a8be-4a03-b33e-0a436d0d4dda" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/eeaa2101-6998-4c67-a82b-07ee96b54b7b" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/e0f87a9c-68ff-466b-9aaa-37a40e14cc68" width="320" height="200"/> |


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
- Theme selector — select from multiple themes

**Notification - Center Top 1/3**
- Hidden notifications from multiple HA `binary_sensor` or `input_boolean`. Useful for reminders like cat maintenance, vitamins not taken, or coffee to prepare for tomorrow.

**Hero area - Center 2/3**
- Full-bleed background image
- Time-aware greeting — Good Morning / Good Afternoon / Good Evening / Good Night
- Home stats grid — up to 10 entity-driven tiles in a 5-column layout

**Now Playing Bar - Center Bottom 3/3**
- When a HA media player is playing, a slim bar slides up from the bottom showing artist, track name, previous/play-pause/next controls, and a live progress bar updated every 2 seconds.
- When nothing is playing the player is hidden
- When music is paused or stops, the players dissappears after a few seconds

**Sensor row pills - Bottom 1/2**
- Floor sensor pill — temperature, humidity, and PM2.5 for up to two floors
- Solar pill — production (kW), today's energy consumption, export (kW), battery state of charge (%), and inverter temperature

**Controls row - Bottom 2/2**
- Chip buttons for each control group (Lights, Scenes, Air Con, Purifiers, Blinds, Bath, Irrigation)
- Active-count badge on each chip (e.g. "3 on")


## Other Features

- 9 Themes
- Fullscreen on first tap
- No pinch-zoom, no text selection
- Haptic Feedback on suported Android devices

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
  | `cover.*` | Blind/curtain card — open, stop, close + position slider. Support for side-pull curtains |
  | `fan.*` | Air purifier card — power toggle + fan-speed percentage slider |
  | `switch.*` / `input_boolean.*` | Simple on/off toggle |
  | `group.*` | Simple toggle (no card controls) |

- Popups with many entities use a room accordion — tap a room to expand it, tap outside to dismiss.

- State cache
  
  `stateCache` is a JavaScript `Map` keyed by `entity_id`. All UI functions read from this cache synchronously; they never make network requests during a render cycle.

- Fallback polling
  
  A `setInterval` fires every 15 seconds. When the WebSocket is healthy, `refreshStateCache()` returns immediately with zero network traffic. It only becomes a real HTTP poll when the WebSocket is disconnected.

- Rendering flow
  
  Every `state_changed` event triggers `refreshAllUI()`, which synchronously updates the hero stats, sensor row, weather widget, chip states, notification banner, and Now Playing bar. The entire cycle typically completes in under 1ms.

## Architecture

### WebSocket flow

1. Dashboard opens WebSocket  
2. HA sends auth_required
3. Dashboard sends token
4. HA sends auth_ok
5. Dashboard sends get_states + subscribe_events(state_changed)
6. get_states seeds stateCache (Map of entity_id → state)
7. Each state_changed event patches one cache entry + re-renders UI

---

## Setup
Follow the homie-dashboard-setup-guide for a step by step guide on how to setup the dashboard.

https://pages.github.com/Big-Edge2297/homie-dashboard/blob/main/homie-dashboard-setup-guide.md

This site was built using [GitHub Pages](https://github.com/Big-Edge2297/homie-dashboard/blob/main/homie-dashboard-setup-guide.md)
