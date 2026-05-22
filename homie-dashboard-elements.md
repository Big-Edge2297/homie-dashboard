## Main Overview Screen Elements

**Top bar - Left**
- Dashboard name
- Live clock and date, updated every second

**Top bar - Middle**
- Weather widget — icon, temperature, and condition from your HA weather entity
- Tapping the weather will open a popup with more info

**Top bar - Right**
- Pet icon — pet stats popup (litter box, feeder, water fountain, litter box usage)
- Security icon — Alarmo controls
- Dashboard Mode icon — select from multiple dashboards
- Setting Cog - Modify Dashboard settings

**Notification - Center Top 1/3**
- Hidden notifications from multiple HA `binary_sensor` or `input_boolean`. Useful for reminders like cat maintenance, vitamins not taken.

**Hero area - Center 2/3**
- Full-bleed background image
- Time-aware greeting — Good Morning / Good Afternoon / Good Evening / Good Night
- Home stats grid — up to 10 entity-driven tiles in a 5-column layout

**Music Playing Bar - Center Bottom 3/3**
- When a HA media player is playing, a slim bar slides up from the bottom showing artist, track name, previous/play-pause/next controls, and a live progress bar updated every 2 seconds.
- When nothing is playing the player is hidden
- When music is paused or stops, the players dissappears after a few seconds

**Sensor row pills - Bottom 1/2**
- Floor sensor pill — temperature, humidity, and PM2.5 for up to two floors
- Solar pill — production (kW), today's energy consumption, export (kW), battery state of charge (%), and inverter temperature

**Controls row - Bottom 2/2**
- Chip buttons for each control group (Lights, Scenes, Air Con, Purifiers, Blinds, Bath, Irrigation)
- Active-count badge on each chip (e.g. "3 on")


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
