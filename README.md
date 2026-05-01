# **Homie Dashboard**

A custom Home Assistant dashboard built for wall-mounted tablets. 

I created this dashboard with the design philosophy of a single page overview for accessing the most important functions and controls of my house easily. 

Homie connects directly to Home Assistant over a Long-Lived Access Token and a local WebSocket connection which results in automatic caching.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-compatible-41BDF5?logo=home-assistant&logoColor=white)

## Security

⚠️ The HA Long-Lived Access Token is stored in plain text inside the HTML file. Anyone who can read the file has full access to your Home Assistant instance.

> DON'T BE like the guy in Massachusetts that has a room named Jason's room - if you have been on Reddit long enough, you will get the joke :)

**Recommendations:**
- Serve the file only on your local network — never expose it to the internet without authentication
- Create a dedicated HA user account for the dashboard token rather than using your personal admin account so you can limit access and exposure
- Revoke and regenerate the token periodically (HA → Profile → Long-Lived Access Tokens)
- For remote access, use a VPN (e.g. WireGuard)

## Dashboard Screenshots

| Main Screen | Notifications and Music | Hero Stats and Chips ON |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/ea02bf92-5c94-4de5-a226-708e6651217f" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/49147619-f734-4b36-bf5d-37583b95d5d8" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/9a76656d-3410-4469-a4df-7a0624930104" width="320" height="200"/> |

| Pet Stats | Calendar | AirCon |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/00381443-7d68-43f9-8296-f20299ad74eb" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/7a1326ec-3ab9-45fe-9d88-49359db6c760" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/2cf69c21-d577-4fd3-8124-47b28d65d1bb" width="320" height="200"/> |

| Lights | Scenes | Blinds |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/79b52001-6b85-4a4f-96f4-0332dfe05f2d" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/404c87ef-6105-49bd-b12b-1d7c6eadfb5f" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/8107d615-41be-457a-9f91-c3e674a654d0" width="320" height="200"/> |


| Alarmo | Media Browse |
|--------|--------|
| <img src="https://github.com/user-attachments/assets/767a5909-e6da-4877-b9c8-569286f33bc4" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/6a60a1d8-3ba5-40fa-82c6-813b217212fa" width="320" height="200"/> | 

| ... and Shumi 🐱 |
|--------|
| <img src="https://github.com/user-attachments/assets/2b4c66f6-2b31-4a11-b967-55e7fc3f4b0a" width="246" height="428"/> |

## Theme Screenshots

| Classic Gold | Deep Copper | Terracotta |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/d92e2c0d-3ddc-4c5a-80ce-7200aacc2dfc" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/2cf7cd06-7009-4824-8a11-12b655a0e93d" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/eb8983a9-b24c-44db-8599-7fe7ad1ac3fe" width="320" height="200"/> |

| Steel Blue | Arctic Cyan | Emerald Green |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/580b6471-731d-489e-91f2-87b9a26e64eb" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/bc928c36-5ecf-4846-ae72-a287074828ac" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/84b79c9a-aa71-46b2-b939-a4237acfca0e" width="320" height="200"/> |

| Amethyst Purple | Solar Yellow | Crimson Red |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/e892a526-7be1-4ae8-bd7a-9627393a776f" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/a7fd6d82-0bce-4535-bc16-d959c1ed63a9" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/00ae02cd-627a-4db5-a154-6d7b32c99ec3" width="320" height="200"/> |


---

## Main Screen Elements

**Top bar - Left**
- Dashboard name
- Live clock and date, updated every second

**Top bar - Middle**
- Weather widget — icon, temperature, and condition from your HA weather entity

**Top bar - Right**
- Pet icon — pet stats popup (litter box, feeder, water fountain, litter box usage)
- Calendar icon — upcoming events from multiple HA calendar entities
- Security icon — Alarmo controls
- Theme icon — select from multiple themes

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


## Features

- Support for Spotify and Music Assistant - new in v1.1.0
- Support for Media Browsing - new in v1.1.0
- Alarmo controls - new in v1.1.0
- 9 Themes
- Works both vertically and horizontally 
- Fullscreen on first tap
- No pinch-zoom, no text selection
- Very responsive and fast to update entity status
- Popups with many entities use a room accordion — tap a room to expand it, tap outside to dismiss
- Notifications/Reminders
- Music playback and controls
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


---

## Setup
Follow the [homie-dashboard-setup-guide](https://github.com/Big-Edge2297/homie-dashboard/blob/main/homie-dashboard-setup-guide.md) for a step by step guide on how to setup the dashboard.
