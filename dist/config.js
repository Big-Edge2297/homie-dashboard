/* ═══════════════════════════════════════════════════════════════════════════
 * HOMIE DASHBOARD CONFIGURATION v3.7.0
 * ═══════════════════════════════════════════════════════════════════════════
 * This is the main configuration file. Edit the sections below to customise the dashboard for your home.
 * Both homie-dashboard.html and config.js must be in the same folder.
 *
 * Search for "YOUR_" to find every value you need to personalise
 * ═══════════════════════════════════════════════════════════════════════════ */

/* ─── TOKEN AUTHENTICATION ────────────────────────────────────────────────────────
 * Paste your Home Assistant Long-Lived Access Token between the quotes below.
 * Generate one in HA → Profile → Security → Long-Lived Access Tokens.
 * ─────────────────────────────────────────────────────────────────────────── */
const HA_TOKEN = "YOUR_LONG_LIVED_ACCESS_TOKEN";


/* ─── WEBSOCKET CONNECTION ────────────────────────────────────────────────────────
 * wsUrl — WebSocket URL of your HA instance. Must match the host/port the dashboard is served from.
 *   Use ws:// for HTTP, wss:// for HTTPS.
 *   e.g. if HA is at http://192.168.1.100:8123 use: ws://192.168.1.100:8123/api/websocket
 *
 * BASE is derived automatically from wsUrl — do not edit it.
 * ─────────────────────────────────────────────────────────────────────────── */
const WS_URL     = "YOUR_WEBSOCKET_URL";

const BASE = WS_URL
  .replace(/^wss:\/\//, "https://")
  .replace(/^ws:\/\//, "http://")
  .replace(/\/api\/websocket$/, "");


/* ─── ALARMO CONFIGURATION ────────────────────────────────────────────────────────
 * ALARM_CODE - Your Alarmo PIN code — sent silently with every arm/disarm command.
 * Leave as empty string ("") if your Alarmo panel has no code configured.
 * ALARM_ENTITY — entity ID of your Alarmo alarm panel.
 * ─────────────────────────────────────────────────────────────────────────── */
const ALARM_CODE = "";
const ALARM_ENTITY = "YOUR_ALARM_ENTITY";


/* ─── PHOTO FRAME ───────────────────────────────────────────────────────────
 * Place images in a photos/ folder alongside this file.
 * Supported formats: jpg, jpeg, png, webp, gif.
 * Filenames are case-sensitive. Missing photos are skipped automatically.
 * PHOTO_FRAME_INTERVAL — seconds each photo is displayed.
 * ─────────────────────────────────────────────────────────────────────────── */
const PHOTO_FRAME_IMAGES = [
  // "photos/YOUR_photo1.jpg",
  // "photos/YOUR_photo2.jpg",
  // "photos/YOUR_photo3.jpg",
];

const PHOTO_FRAME_INTERVAL = 20; // seconds per photo


const CONFIG = {

  /* ── WELCOME GREETING ────────────────────────────────────────────────────
   * Automatically changes based on the time of day.
   * Edit `from` (inclusive) for each slot to match your schedule.
   * Slots are evaluated in order — the first match wins.
   * The last slot acts as the fallback (its `from` is ignored).
        * ──────────────────────────────────────────────────────────────────── */
  greetingSlots: [
    { slot: 'morning',   from:  5, label: 'GOOD MORNING'   },
    { slot: 'afternoon', from: 12, label: 'GOOD AFTERNOON' },
    { slot: 'evening',   from: 18, label: 'GOOD EVENING'   },
    { slot: 'night',     from: 22, label: 'GOOD NIGHT'     },
  ],

  get welcomeText() {
    const h = new Date().getHours();
    const slots = this.greetingSlots;
    for (let i = slots.length - 1; i >= 0; i--) {
      if (h >= slots[i].from) return slots[i].label;
    }
    return slots[slots.length - 1].label;
  },

  /* ── SERVER CONNECTION ───────────────────────────────────────────────────
   * References the constants defined above. Do not edit here — edit
   * WS_URL and ALARM_ENTITY at the top of this file instead.
        * ──────────────────────────────────────────────────────────────────── */
  wsUrl:       WS_URL,
  alarmEntity: ALARM_ENTITY,

  /* ── WEATHER ─────────────────────────────────────────────────────────────
   * HA weather entity shown at the top-centre of the dashboard.
   * Change tempUnit to "°F" if you prefer Fahrenheit.
        * ──────────────────────────────────────────────────────────────────── */
  weather: {
    entity: "YOUR_WEATHER_ENTITY",
    tempUnit: "°C",
  },

  /* ── SUN RISE / SUN SET ──────────────────────────────────────────────────
   * Sensor entities for the sunrise/sunset arc in the weather screen.
   * Note: these may differ from the standard HA sun integration names
   * (sensor.sun_next_rising / sensor.sun_next_setting). Check yours at
   * HA → Developer Tools → States and search for "sun".
   *
   * timezone — IANA timezone string (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
        * ──────────────────────────────────────────────────────────────────── */
  sun: {
    sunrise: "YOUR_SUNRISE_ENTITY",   // check HA → Developer Tools → States if unsure
    sunset:  "YOUR_SUNSET_ENTITY",
    timezone: "YOUR_TIMEZONE",        // e.g. "Europe/London", "America/New_York"
  },

  /* ── AIR QUALITY INDEX ───────────────────────────────────────────────────
   * Sensor entity for the AQI ring card in the weather screen.
   * You can use worlds-air-quality-index from HACS.
        * ──────────────────────────────────────────────────────────────────── */
  aqi: {
    entity: "YOUR_AQI_ENTITY",
    pm25:   "YOUR_AQI_PM25_ENTITY",
    pm10:   "YOUR_AQI_PM10_ENTITY",
    co:     "YOUR_AQI_CO_ENTITY",
    no2:    "YOUR_AQI_NO2_ENTITY",

    /* ── AQI BANDS ────────────────────────────────────────────────────────
     * Six bands that map an AQI value to a label, description, and colour.
     * Defaults follow the US EPA scale (0–500). If your sensor uses a
     * different scale (EU CAQI, China AQI, etc.) adjust max values,
     * labels, and descriptions to match.
     *
     * Each band needs:
     *   max   — upper bound (inclusive) for this band; use Infinity for the
     *           last band so any value above the previous max is caught.
     *   label — short name shown inside the AQI ring (e.g. "Good").
     *   text  — longer description shown below the ring.
     *   color — hex colour used for the label text and the lit ring dots.
             * ──────────────────────────────────────────────────────────────────── */
    bands: [
      { max:  50, label: "Good",                            color: "#4caf8a", text: "The air is in standard level and is healthy for everyone." },
      { max: 100, label: "Moderate",                        color: "#f0c040", text: "Air quality is acceptable; some pollutants may affect sensitive groups." },
      { max: 150, label: "Unhealthy for Sensitive Groups",  color: "#f08040", text: "Members of sensitive groups may experience health effects." },
      { max: 200, label: "Unhealthy",                       color: "#e04040", text: "Everyone may begin to experience health effects." },
      { max: 300, label: "Very Unhealthy",                  color: "#9c40a0", text: "Health warnings of emergency conditions." },
      { max: Infinity, label: "Hazardous",                  color: "#7e0023", text: "Health alert: everyone may experience serious health effects." },
    ],
  },

  /* ── MOON PHASE ──────────────────────────────────────────────────────────
   * Sensor entity for the moon phase display in the weather screen.
   * You can use the moon integration from HA.
        * ──────────────────────────────────────────────────────────────────── */
  moon: {
    entity: "YOUR_MOON_PHASE_ENTITY",
  },

  /* ── HOME OVERVIEW STATS ─────────────────────────────────────────────────
   * Stats shown in the hero area on the Overview screen (up to 10, 5-column grid).
   * Each entry: label, entity, onValue, offValue.
   *
   * Special cases handled automatically:
   *   alarm_control_panel.* — onValue when armed (any armed_* / arming state).
   *   cover.* / binary_sensor.* — "on" triggers on "open" or "opening" state.
   *
   * If a stat shows "—", verify the entity ID at HA → Developer Tools → States.
        * ──────────────────────────────────────────────────────────────────── */
  homeStats: [
    { label: "Doors",       entity: "YOUR_ALL_DOORS_ENTITY",            onValue: "Open",     offValue: "Closed" },
    { label: "Windows",     entity: "YOUR_ALL_WINDOWS_ENTITY",          onValue: "Open",     offValue: "Closed" },
    { label: "Alarm",       entity: "YOUR_ALARM_ENTITY",                onValue: "Armed",    offValue: "Disarmed" },
    { label: "Cameras",     entity: "YOUR_CAMERA_PRIVACY_ENTITY",       onValue: "Off",      offValue: "Active" },
    { label: "Motion",      entity: "YOUR_ALL_MOTION_SENSORS_ENTITY",   onValue: "Detected", offValue: "Clear" },
    { label: "Lights",      entity: "YOUR_ALL_LIGHTS_ENTITY",           onValue: "On",       offValue: "Off" },
    { label: "Air Con",     entity: "YOUR_ALL_AC_UNITS_ENTITY",         onValue: "On",       offValue: "Off" },
    { label: "Purifiers",   entity: "YOUR_ALL_PURIFIERS_ENTITY",        onValue: "On",       offValue: "Off" },
    { label: "W. Heater",   entity: "YOUR_WATER_HEATER_ENTITY",         onValue: "On",       offValue: "Off" },
    { label: "T. Warmer",   entity: "YOUR_ALL_TOWEL_WARMERS_ENTITY",    onValue: "On",       offValue: "Off" },
  ],

  /* ── SENSOR ROW ──────────────────────────────────────────────────────────
   * floorSensors — side-by-side floor panels, each with any number of readings.
   * Add/remove entire { label, sensors } blocks to add/remove panels.
   * Add/remove sensor lines within a panel to add/remove readings.
   * ─────────────────────────────────────────────────────────────────────────── */
  floorSensors: [
    {
      label: "First Floor",
      sensors: [
        { type: "temp",     entity: "YOUR_FLOOR1_TEMP_ENTITY",     unit: "°C",    decimal: true },
        { type: "humidity", entity: "YOUR_FLOOR1_HUMIDITY_ENTITY", unit: "%"                    },
        { type: "pm25",     entity: "YOUR_FLOOR1_PM25_ENTITY",     unit: "μg/m³"                },
      ],
    },
    {
      label: "Second Floor",
      sensors: [
        { type: "temp",     entity: "YOUR_FLOOR2_TEMP_ENTITY",     unit: "°C", decimal: true },
        { type: "humidity", entity: "YOUR_FLOOR2_HUMIDITY_ENTITY", unit: "%"                 },
        { type: "pm25",     entity: "YOUR_FLOOR2_PM25_ENTITY",     unit: "μg/m³"             },
      ],
    },
    {
      label: "Solar",
      get sensors() { return CONFIG.solar.sensorRow; },
    },
  ],

  /* ── SOLAR DASHBOARD ─────────────────────────────────────────────────────
   * All entities used by the Solar fullscreen dashboard.
   * sensorRow   — shown in the floor sensor strip (keep this lean).
   * stats        — drives the two stat rows inside the solar dashboard.
   *   The first 5 types (solar, power, export, battery, solar-temp) feed the
   *   bottom stat row. The remaining 4 feed the top consumption/cost row.
   * ──────────────────────────────────────────────────────────────────────── */
  solar: {
    sensorRow: [
      { type: "solar",      entity: "YOUR_SOLAR_PRODUCTION_KW_ENTITY",    unit: "kW", decimal: true },
      { type: "power",      entity: "YOUR_TODAYS_ENERGY_KW_ENTITY",       unit: "kW", decimal: true },
      { type: "export",     entity: "YOUR_SOLAR_EXPORT_KW_ENTITY",        unit: "kW", decimal: true },
      { type: "battery",    entity: "YOUR_BATTERY_SOC_ENTITY",            unit: "%"                 },
      { type: "solar-temp", entity: "YOUR_INVERTER_TEMP_ENTITY",          unit: "°C", decimal: true },
    ],
    stats: [
      { type: "solar",            entity: "YOUR_SOLAR_PRODUCTION_KW_ENTITY",    unit: "kW",  decimal: true  },
      { type: "power",            entity: "YOUR_TODAYS_ENERGY_KW_ENTITY",       unit: "kW",  decimal: true  },
      { type: "export",           entity: "YOUR_SOLAR_EXPORT_KW_ENTITY",        unit: "kW",  decimal: true  },
      { type: "battery",          entity: "YOUR_BATTERY_SOC_ENTITY",            unit: "%",   decimal: false },
      { type: "solar-temp",       entity: "YOUR_INVERTER_TEMP_ENTITY",          unit: "°C",  decimal: true  },
      { type: "live-consumption", entity: "YOUR_TODAYS_ENERGY_W_ENTITY",        unit: "W",   decimal: false },
      { type: "monthly-kwh",      entity: "YOUR_MONTHLY_ENERGY_KWH_ENTITY",     unit: "kWh", decimal: true  },
      { type: "today-cost",       entity: "YOUR_TODAYS_ENERGY_COST_ENTITY",     unit: "€",   decimal: true  },
      { type: "monthly-cost",     entity: "YOUR_MONTHLY_ENERGY_COST_ENTITY",    unit: "€",   decimal: true  },
    ],
  },

  /* ── MUSIC PLAYERS ───────────────────────────────────────────────────────
   * Each entry: entity (required), label (optional; derived from entity ID if omitted).
   * The dashboard shows whichever player is currently active. Tap the source
   * pill to cycle through multiple active players.
        * ──────────────────────────────────────────────────────────────────── */
  musicPlayers: [
    { entity: "YOUR_SPOTIFY_PLAYER_ENTITY",  label: "Spotify" },
    { entity: "YOUR_ECHO_PLAYER_ENTITY",     label: "Echo"    },
    { entity: "YOUR_SONOS_PLAYER_ENTITY",    label: "Sonos"   },
    // { entity: "media_player.apple_tv",    label: "Apple TV" },
    // { entity: "media_player.music_assistant", label: "MA"   },
  ],

  /* musicHideDelay — ms the Now Playing bar stays visible after music stops.
   * Default: 10000 (10 seconds). */
  musicHideDelay: 10_000,

  /* ── CALENDAR ────────────────────────────────────────────────────────────
   * List of HA calendar entities to pull upcoming events from.
   * Events are merged and sorted by date. */
  calendarEntities: ["YOUR_CALENDAR_ENTITY_1", "YOUR_CALENDAR_ENTITY_2"],
  mealCalendarEntity: "YOUR_MEAL_CALENDAR_ENTITY",
  
  /* mealSlots — the four meal periods in the Today's Meals card.
   * Each entry: key (matched case-insensitively against calendar event titles),
   *   label, icon (inline SVG), hour (0–23, fallback time when none is set).
   * ────────────────────────────────────────────────────────────────────── */
  mealSlots: [
    { key: "breakfast", label: "Breakfast", icon: ICONS.meals.breakfast, hour: 9  },
    { key: "lunch",     label: "Lunch",     icon: ICONS.meals.lunch,     hour: 13 },
    { key: "snack",     label: "Snack",     icon: ICONS.meals.snack,     hour: 16 },
    { key: "dinner",    label: "Dinner",    icon: ICONS.meals.dinner,    hour: 19 },
  ],

  /* ── NOTIFICATIONS ───────────────────────────────────────────────────────
   * Binary sensors or input_booleans to watch for reminders.
   * When any are "on", a notification bar appears on the Overview screen.
   * Add as many as you like.
   * ──────────────────────────────────────────────────────────────────── */
  notifications: [
    { label: "YOUR_NOTIFICATION_LABEL_1", entity: "YOUR_NOTIFICATION_ENTITY_1" },
    { label: "YOUR_NOTIFICATION_LABEL_2", entity: "YOUR_NOTIFICATION_ENTITY_2" },
    // Add more notifications as needed
  ],

  /* ── ECHO TIMERS ─────────────────────────────────────────────────────────
   * Amazon Echo timer sensors. Each active timer is shown as a live
   * countdown bubble underneath the notification bar.
   * Add/remove entries to match your Echo devices.
   * ──────────────────────────────────────────────────────────────────── */
  echoTimers: [
    { label: "YOUR_ECHO_LABEL_1", entity: "YOUR_ECHO_TIMER_ENTITY_1" },
    { label: "YOUR_ECHO_LABEL_2", entity: "YOUR_ECHO_TIMER_ENTITY_2" },
    { label: "YOUR_ECHO_LABEL_3", entity: "YOUR_ECHO_TIMER_ENTITY_3" },
  ],

  /* ── WAZE TRAVEL TIME ────────────────────────────────────────────────────
   * Displays a travel-time notification bubble (same style as Echo timers)
   * only on the configured days and within the specified time window.
   *
   * label     — text shown in the bubble (e.g. "Work Travel")
   * entity    — HA sensor entity_id (e.g. "sensor.work_travel_time")
   * days      — days of the week to show it (0 = Sunday … 6 = Saturday)
   * timeStart — hour (0–23) at which the bubble starts appearing (inclusive)
   * timeEnd   — hour (0–23) at which the bubble stops appearing (exclusive)
   * ──────────────────────────────────────────────────────────────────── */
  wazeTravelTime: [
    // Add as many entries as you like. Each one becomes its own bubble.
    // days: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    { label: "Work Travel",   entity: "YOUR_WAZE_TRAVEL_TIME_ENTITY", days: [2, 4], timeStart: 7, timeEnd: 20 },
    // { label: "Home Travel", entity: "YOUR_HOME_TRAVEL_TIME_ENTITY", days: [1,2,3,4,5], timeStart: 16, timeEnd: 19 },
  ],

  /* ── CAMERAS ─────────────────────────────────────────────────────────────
   * List of camera entities shown in the Cameras dashboard (launcher button).
   * Up to 6 cameras are displayed in a 3×2 grid.
   *
   * entity        — HA camera entity_id
   * label         — display name shown in the bottom-left of each cell
   * motionEntity  — (optional) binary_sensor entity_id for motion detection;
   *                 cell glows red with a pulsing dot when motion is detected
   *
   * cameraRefreshSeconds — how often each frame is fetched (default: 1)
   * ──────────────────────────────────────────────────────────────────────── */
  cameraRefreshSeconds: 1,

  cameras: [
    { entity: "YOUR_CAMERA_1_ENTITY", label: "Camera 1", motionEntity: "YOUR_CAMERA_1_MOTION_ENTITY" },
    { entity: "YOUR_CAMERA_2_ENTITY", label: "Camera 2", motionEntity: "YOUR_CAMERA_2_MOTION_ENTITY" },
    { entity: "YOUR_CAMERA_3_ENTITY", label: "Camera 3", motionEntity: "YOUR_CAMERA_3_MOTION_ENTITY" },
    { entity: "YOUR_CAMERA_4_ENTITY", label: "Camera 4", motionEntity: "YOUR_CAMERA_4_MOTION_ENTITY" },
    { entity: "YOUR_CAMERA_5_ENTITY", label: "Camera 5", motionEntity: "YOUR_CAMERA_5_MOTION_ENTITY" },
    { entity: "YOUR_CAMERA_6_ENTITY", label: "Camera 6", motionEntity: "YOUR_CAMERA_6_MOTION_ENTITY" },
  ],

  /* ── DOORBELL ────────────────────────────────────────────────────────────
   * buttonEntity — the HA button entity that triggers the doorbell overlay.
   * cameraEntity — the HA camera entity to stream when the bell is pressed.
   * label        — text shown in the overlay header.
   * ─────────────────────────────────────────────────────────────────────── */
  doorbell: {
    buttonEntity: "YOUR_DOORBELL_BUTTON_ENTITY",
    cameraEntity: "YOUR_DOORBELL_CAMERA_ENTITY",
    label:        "Doorbell · Front Door",
  },

  /* ── PET STATS ───────────────────────────────────────────────────────────
   * Entities for the pet stats popup (top-right button).
   *  petName           — name shown on the button and popup title
   *  litterCount/Last  — visits today / last use timestamp
   *  foodCount/Weight  — portions dispensed / total grams today
   *  foodDes           — feeder desiccant days remaining
   *  waterVol/Filter   — purified water today (ml) / filter life (%)
   * ──────────────────────────────────────────────────────────────────── */
  petName: "YOUR_PET_NAME",
  petStats: {
    litterCount:        "YOUR_LITTER_COUNT_ENTITY",
    litterLast:         "YOUR_LITTER_LAST_ENTITY",
    litterCounter:      "YOUR_LITTER_COUNTER_ENTITY",
    litterResetAuto:    "YOUR_LITTER_RESET_AUTO_ENTITY",
    litterCleanBoolean: "YOUR_LITTER_CLEAN_BOOLEAN_ENTITY",
    foodCount:          "YOUR_FOOD_COUNT_ENTITY",
    foodWeight:         "YOUR_FOOD_WEIGHT_ENTITY",
    foodDes:            "YOUR_FOOD_DESICCANT_ENTITY",
    waterVol:           "YOUR_WATER_VOL_ENTITY",
    waterFilter:        "YOUR_WATER_FILTER_ENTITY",

  /* ── LITTER CHART COLOUR THRESHOLDS ──────────────────────────────────────────
   * Bar colours in the "Last 5 Days" litter chart.
   * ≤ okMax visits/day → green; ≤ warnMax → orange; above → red.
        * ──────────────────────────────────────────────────────────────────── */
    litterChart: {
      okMax:   5,   // ≤ this many visits/day → green
      warnMax: 10,  // ≤ this many visits/day → orange  (anything above → red)
      colors: {
        ok:   "#22a722",
        warn: "#f59e0b",
        high: "#ef4444",
      },
    },
  },

  /* ── HABIT & MOOD TRACKER ────────────────────────────────────────────────
   * HISTORY SYNC — input_text helpers that persist history in HA.
   * Must match configuration.yaml:
   *   input_text:
   *     dashboard_habits_log: { name: Dashboard Habits Log, max: 255 }
   *     dashboard_mood_log:   { name: Dashboard Mood Log,   max: 255 }
   *
   * moods  — each entry: key (letters only), icon (emoji), label.
   *          Set to [] to disable the mood tracker.
   * habits — each entry: key, label, icon (SVG; use stroke="var(--accent)").
   *          Set to [] to disable the habit tracker.
        * ──────────────────────────────────────────────────────────────────── */
  habitsMoodHistoryEntities: {
    habits: "YOUR_HABITS_LOG_ENTITY",
    mood:   "YOUR_MOOD_LOG_ENTITY",
  },

  moods: [
    { key: "great", icon: "😄", label: "Great" },
    { key: "good",  icon: "😊", label: "Good"  },
    { key: "okay",  icon: "😐", label: "Okay"  },
    { key: "meh",   icon: "😕", label: "Meh"   },
    { key: "bad",   icon: "😢", label: "Bad"   },
  ],

  habits: [
    { key: "water",    label: "Hydrate",  icon: ICONS.habits.water    },
    { key: "workout",  label: "Workout",  icon: ICONS.habits.workout  },
    { key: "read",     label: "Read",     icon: ICONS.habits.read     },
    { key: "meditate", label: "Meditate", icon: ICONS.habits.meditate },
    { key: "snacks",   label: "Snacks",   icon: ICONS.habits.snacks   },
  ],

  /* ── GLOBAL CONTROLS ─────────────────────────────────────────────────────
   * Chip buttons shown at the bottom of the Overview screen.
   *
   * Card type is determined by entity domain:
   *   light.*         → brightness + colour presets
   *   climate.*       → AC card (mode, fan speed, temperature)
   *   cover.*         → blind/curtain card (open, close, stop, position)
   *   fan.*           → purifier card (power, fan speed)
   *   switch.* / input_boolean.* / group.* / everything else → on/off toggle
   *   (group.* toggles the whole group — list lights as light.* for per-light control)
   *
   * subEntities — flat list; subGroups — per-room accordion. Mix freely.
   * expandable: true on a subEntity adds a nested accordion within a subGroup.
   *
   * Optional chip flags:
   *   showCount: true      — shows active count next to the label
   *   noRoomGrouping: true — flat list even when subGroups is used
   *   twoColumnGrid: true  — two-column layout for many small cards
   *   isSceneChip: true    — turns subGroups into scene category launchers
        * ──────────────────────────────────────────────────────────────────── */
  controls: [
    {
      label: "Lights",
      showCount: true,
      subGroups: [
        { label: "Living",    subEntities: [
          { label: "Center",       entity: "YOUR_LIVING_ROOM_LIGHT_CENTER_ENTITY" },
          { label: "Table",        entity: "YOUR_LIVING_ROOM_LIGHT_TABLE_ENTITY" },
          { label: "Couch",        entity: "YOUR_LIVING_ROOM_LIGHT_COUCH_ENTITY" },
          { label: "TV Strip",     entity: "YOUR_LIVING_ROOM_LIGHT_TV_STRIP_ENTITY" },
          { label: "TV Cabinet",   entity: "YOUR_LIVING_ROOM_LIGHT_TV_CABINET_ENTITY" },
        ]},
        { label: "Dining",    subEntities: [
          { label: "Center",       entity: "YOUR_DINING_ROOM_LIGHT_ENTITY" },
        ]},
        { label: "Kitchen",   subEntities: [
          { label: "Center",       entity: "YOUR_KITCHEN_LIGHT_ENTITY" },
        ]},
        { label: "Office",    subEntities: [
          { label: "Center",       entity: "YOUR_OFFICE_LIGHT_ENTITY" },
          { label: "Desk Lamp",    entity: "YOUR_OFFICE_DESK_LAMP_ENTITY" },
        ]},
        { label: "Storage",   subEntities: [
          { label: "Center",       entity: "YOUR_STORAGE_LIGHT_ENTITY" },
        ]},
        { label: "Bedroom",   subEntities: [
          { label: "Center",       entity: "YOUR_BEDROOM_LIGHT_ENTITY" },
          { label: "Iris",         entity: "YOUR_BEDROOM_LIGHT_IRIS_ENTITY" },
        ]},
        { label: "Bathrooms", subEntities: [
          { label: "Guest",        entity: "YOUR_BATHROOM_GUEST_LIGHT_ENTITY" },
          { label: "Main",         entity: "YOUR_BATHROOM_MAIN_LIGHT_ENTITY" },
          { label: "Ensuite",      entity: "YOUR_BATHROOM_ENSUITE_LIGHT_ENTITY" },
        ]},
        { label: "Outside",  subEntities: [
          { label: "Entrance",     entity: "YOUR_OUTSIDE_ENTRANCE_LIGHT_ENTITY" },
          { label: "Garage",       entity: "YOUR_OUTSIDE_GARAGE_LIGHT_ENTITY" },
          { label: "Side",         entity: "YOUR_OUTSIDE_SIDE_LIGHT_ENTITY" },
          { label: "Porch",        entity: "YOUR_OUTSIDE_PORCH_LIGHT_ENTITY" },
        ]},
        { label: "Garden",  subEntities: [
          { label: "Front Wall",   entity: "YOUR_GARDEN_FRONT_WALL_LIGHT_ENTITY" },
          { label: "Back Wall",    entity: "YOUR_GARDEN_BACK_WALL_LIGHT_ENTITY" },
          { label: "Spots",        entity: "YOUR_GARDEN_SPOTS_LIGHT_ENTITY" },
        ]},
      ],
    },
    { label: "Scenes", noRoomGrouping: true, isSceneChip: true,
      subGroups: [
        {
          label: "Living",
          scenes: [
            { label: "Relax",     entity: "YOUR_LIVING_ROOM_RELAX_SCENE_ENTITY",       color: "#4a2d7a",  icon: ICONS.scenes.relax      },
            { label: "Romantic",  entity: "YOUR_LIVING_ROOM_ROMANTIC_SCENE_ENTITY",    color: "#8b2252",  icon: ICONS.scenes.romantic   },
            { label: "Movie",     entity: "YOUR_LIVING_ROOM_MOVIE_SCENE_ENTITY",       color: "#f0ece4",  icon: ICONS.scenes.movie      },
            { label: "Candle",    entity: "YOUR_LIVING_ROOM_CANDLE_SCENE_ENTITY",      color: "#7a4a1e",  icon: ICONS.scenes.candle     },
            { label: "Fireplace", entity: "YOUR_LIVING_ROOM_FIREPLACE_SCENE_ENTITY",   color: "#8b3a10",  icon: ICONS.scenes.fireplace  },
          ],
        },
        {
          label: "Bedroom",
          scenes: [
            { label: "Nightlight", entity: "YOUR_BEDROOM_NIGHTLIGHT_SCENE_ENTITY",     color: "#6b3800",  icon: ICONS.scenes.nightlight },
            { label: "Romantic",   entity: "YOUR_BEDROOM_ROMANTIC_SCENE_ENTITY",        color: "#8b2252",  icon: ICONS.scenes.romantic   },
            { label: "Candle",     entity: "YOUR_BEDROOM_CANDLE_SCENE_ENTITY",          color: "#7a4a1e",  icon: ICONS.scenes.candle     },
            { label: "Fireplace",  entity: "YOUR_BEDROOM_FIREPLACE_SCENE_ENTITY",       color: "#8b3a10",  icon: ICONS.scenes.fireplace  },
          ],
        },
      ],
    },
    { label: "Air Con", showCount: true,
      subEntities: [
        { label: "Living",   entity: "YOUR_AC_LIVING_ENTITY" },
        { label: "Dining",   entity: "YOUR_AC_DINING_ENTITY" },
        { label: "Office",   entity: "YOUR_AC_OFFICE_ENTITY" },
        { label: "Storage",  entity: "YOUR_AC_STORAGE_ENTITY" },
        { label: "Bedroom",  entity: "YOUR_AC_BEDROOM_ENTITY" },
      ],
    },
    { label: "Purifiers", showCount: true,
      subEntities: [
        { label: "Living",   entity: "YOUR_PURIFIER_LIVING_ENTITY" },
        { label: "Office",   entity: "YOUR_PURIFIER_OFFICE_ENTITY" },
        { label: "Bedroom",  entity: "YOUR_PURIFIER_BEDROOM_ENTITY" },
      ],
    },
    { label: "Blinds", showCount: true,
      noRoomGrouping: true,
      // isCurtain: true — flips the open/close arrow direction for side-to-side curtains.
      subEntities: [
        { label: "Living",   entity: "YOUR_BLIND_LIVING_ENTITY" },
        { label: "Dining",   entity: "YOUR_BLIND_DINING_ENTITY", isCurtain: true },
        { label: "Kitchen",  entity: "YOUR_BLIND_KITCHEN_ENTITY" },
        { label: "Storage",  entity: "YOUR_BLIND_STORAGE_ENTITY" },
        { label: "Office",   entity: "YOUR_BLIND_OFFICE_ENTITY" },
        { label: "Bedroom",  entity: "YOUR_BLIND_BEDROOM_ENTITY" },
      ],
    },
    { label: "Bath", showCount: true, noRoomGrouping: true,
      subGroups: [
        {
          label: "House",
          subEntities: [
            { label: "Water Heater",   entity: "YOUR_WATER_HEATER_ENTITY" },
            { label: "HW Circulation", expandable: true,
              subEntities: [
                { label: "Kitchen",   entity: "YOUR_HW_CIRC_KITCHEN_ENTITY" },
                { label: "Main Bath", entity: "YOUR_HW_CIRC_MAIN_BATH_ENTITY" },
                { label: "Ensuite",   entity: "YOUR_HW_CIRC_ENSUITE_ENTITY" },
              ],
            },
          ],
        },
        {
          label: "Main Bath",
          subEntities: [
            { label: "Fan",          entity: "YOUR_MAIN_BATH_FAN_ENTITY" },
            { label: "Towel Warmer", entity: "YOUR_MAIN_BATH_TOWEL_WARMER_ENTITY" },
          ],
        },
        {
          label: "Ensuite",
          subEntities: [
            { label: "Fan",          entity: "YOUR_ENSUITE_FAN_ENTITY" },
            { label: "Towel Warmer", entity: "YOUR_ENSUITE_TOWEL_WARMER_ENTITY" },
          ],
        },
      ],
    },
    { label: "Irrigation", showCount: true,
      noRoomGrouping: true,
      twoColumnGrid:  true,
      subEntities: [
        { label: "Front", entity: "YOUR_IRRIGATION_FRONT_ENTITY" },
        { label: "Back",  entity: "YOUR_IRRIGATION_BACK_ENTITY" },
      ],
    },
  ],

};

