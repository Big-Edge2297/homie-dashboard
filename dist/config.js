/* ═══════════════════════════════════════════════════════════════════════════
 * HOMIE DASHBOARD CONFIGURATION v3.3.0
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
   * You can adjust the hour ranges below to suit your schedule.
   * ──────────────────────────────────────────────────────────────────── */
  get welcomeText() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12)  return "GOOD MORNING";
    if (h >= 12 && h < 18) return "GOOD AFTERNOON";
    if (h >= 18 && h < 22) return "GOOD EVENING";
    return "GOOD NIGHT";
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
    { label: "Air Con",     entity: "YOUR_ALL_AC_GROUP_ENTITY",         onValue: "On",       offValue: "Off" },
    { label: "Purifiers",   entity: "YOUR_ALL_PURIFIERS_ENTITY",        onValue: "On",       offValue: "Off" },
    { label: "W. Heater",   entity: "YOUR_WATER_HEATER_ENTITY",         onValue: "On",       offValue: "Off" },
    { label: "T. Warmer",   entity: "YOUR_TOWEL_WARMER_ENTITY",         onValue: "On",       offValue: "Off" },
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
        { type: "temp",     entity: "YOUR_FIRST_FLOOR_TEMP_ENTITY",     unit: "°C",    decimal: true },
        { type: "humidity", entity: "YOUR_FIRST_FLOOR_HUMIDITY_ENTITY", unit: "%"                    },
        { type: "pm25",     entity: "YOUR_FIRST_FLOOR_PM25_ENTITY",     unit: "μg/m³"                },
      ],
    },
    {
      label: "Second Floor",
      sensors: [
        { type: "temp",     entity: "YOUR_SECOND_FLOOR_TEMP_ENTITY",     unit: "°C", decimal: true },
        { type: "humidity", entity: "YOUR_SECOND_FLOOR_HUMIDITY_ENTITY", unit: "%"                 },
        { type: "pm25",     entity: "YOUR_SECOND_FLOOR_PM25_ENTITY",     unit: "μg/m³"             },
      ],
    },
    {
      label: "Solar",
      sensors: [
        { type: "solar",      entity: "YOUR_SOLAR_PRODUCTION_ENTITY", unit: "kW", decimal: true },
        { type: "power",      entity: "YOUR_POWER_SENSOR_ENTITY",     unit: "kW", decimal: true },
        { type: "export",     entity: "YOUR_SOLAR_EXPORT_ENTITY",     unit: "kW", decimal: true },
        { type: "battery",    entity: "YOUR_BATTERY_SOC_ENTITY",      unit: "%"                 },
        { type: "solar-temp", entity: "YOUR_INVERTER_TEMP_ENTITY",    unit: "°C", decimal: true },
      ],
    },
  ],

  /* ── MUSIC PLAYERS ───────────────────────────────────────────────────────
   * Each entry: entity (required), label (optional; derived from entity ID if omitted).
   * The dashboard shows whichever player is currently active. Tap the source
   * pill to cycle through multiple active players.
   * ──────────────────────────────────────────────────────────────────── */
  musicPlayers: [
    { entity: "YOUR_PRIMARY_MEDIA_PLAYER_ENTITY",   label: "Spotify" },
    // { entity: "YOUR_SECONDARY_MEDIA_PLAYER_ENTITY", label: "Echo"    },
    // { entity: "YOUR_THIRD_MEDIA_PLAYER_ENTITY",  label: "Sonos"   },
    // { entity: "media_player.apple_tv",           label: "Apple TV" },
    // { entity: "media_player.music_assistant",    label: "MA"       },
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
   * ───────────────────────────────────────────────────────────────────── */
  mealSlots: [
    { key: "breakfast", label: "Breakfast", icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`, hour: 9  },
    { key: "lunch",     label: "Lunch",     icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>`, hour: 13 },
    { key: "snack",     label: "Snack",     icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`, hour: 16 },
    { key: "dinner",    label: "Dinner",    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>`, hour: 19 },
  ],

  /* ── NOTIFICATIONS ───────────────────────────────────────────────────────
   * Binary sensors or input_booleans to watch for reminders.
   * When any are "on", a notification bar appears on the Overview screen.
   * Add as many as you like.
   * ──────────────────────────────────────────────────────────────────── */
  notifications: [
    { label: "Pet Maintenance",                    entity: "YOUR_PET_MAINTENANCE_ENTITY" },
    { label: "Car Maintenance",                    entity: "YOUR_CAR_MAINTENANCE_ENTITY" },
    { label: "Home Maintenance",                   entity: "YOUR_HOME_MAINTENANCE_ENTITY" },
    { label: "Personal Maintenance",               entity: "YOUR_PERSONAL_MAINTENANCE_ENTITY" },
    { label: "Take Your Vitamins",                 entity: "YOUR_VITAMINS_ENTITY" },
    { label: "Litter Box Needs Cleaning",          entity: "YOUR_LITTER_BOX_CLEAN_ENTITY" },
    { label: "Pet Food/Water Problem",             entity: "YOUR_PET_FOOD_WATER_ENTITY" },
    { label: "Prepare Coffee for Tomorrow",        entity: "YOUR_COFFEE_PREPARATION_ENTITY" },
  ],

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
    litterCount:        "YOUR_LITTER_BOX_USES_TODAY_ENTITY",
    litterLast:         "YOUR_LITTER_BOX_LAST_USED_ENTITY",
    litterCounter:      "YOUR_LITTER_BOX_COUNTER_ENTITY",
    litterResetAuto:    "YOUR_LITTER_BOX_COUNTER_RESET_AUTOMATION",
    litterCleanBoolean: "YOUR_LITTER_BOX_CLEAN_BOOLEAN_ENTITY",
    foodCount:          "YOUR_FEEDER_TIMES_DISPENSED_ENTITY",
    foodWeight:         "YOUR_FEEDER_WEIGHT_DISPENSED_ENTITY",
    foodDes:            "YOUR_FEEDER_DESICCANT_DAYS_ENTITY",
    waterVol:           "YOUR_WATER_FOUNTAIN_VOLUME_ENTITY",
    waterFilter:        "YOUR_WATER_FOUNTAIN_FILTER_ENTITY",

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
    {
      key: "water", label: "Hydrate",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    },
    {
      key: "workout", label: "Workout",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 10h3v4H3zM18 10h3v4h-3z"/><line x1="6" y1="12" x2="18" y2="12"/></svg>`,
    },
    {
      key: "read", label: "Read",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    },
    {
      key: "meditate", label: "Meditate",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="var(--accent)" stroke="none"/><path d="M5 12c0-2 2-4 7-4s7 2 7 4"/><path d="M3 16c1-3 4-4 9-4s8 1 9 4"/><path d="M6 16c0 2 2.5 3 6 3s6-1 6-3"/><line x1="12" y1="8" x2="12" y2="12"/></svg>`,
    },
    {
      key: "snacks", label: "Snacks",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-1 0-3.5 1-3.5 4 0 0 1.5-1 3.5-1s3.5 1 3.5 1C15.5 4 13 3 12 3z"/><path d="M14 2c0 0 1-2 3-1"/><path d="M6.5 8C4 8 2 10.5 2 13.5 2 17.5 5 22 8 22c1.5 0 2-0.5 4-0.5s2.5 0.5 4 0.5c3 0 6-4.5 6-8.5C22 10.5 20 8 17.5 8c-1.5 0-2.5 1-5.5 1S8 8 6.5 8z"/></svg>`,
    },
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
            { label: "Relax",     entity: "YOUR_LIVING_ROOM_RELAX_SCENE_ENTITY",       color: "#4a2d7a",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="1.5"/><path d="M9 9 Q8 13 10 15 L8 21"/><path d="M9 9 L15 9 Q17 9 17 12 L17 15"/><path d="M10 15 L17 15 L19 21"/><path d="M6 21 L20 21"/></svg>` },
            { label: "Romantic",  entity: "YOUR_LIVING_ROOM_ROMANTIC_SCENE_ENTITY",    color: "#8b2252",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>` },
            { label: "Movie",     entity: "YOUR_LIVING_ROOM_MOVIE_SCENE_ENTITY",        color: "#f0ece4",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(20,16,12,0.85)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>` },
            { label: "Candle",    entity: "YOUR_LIVING_ROOM_CANDLE_SCENE_ENTITY",       color: "#7a4a1e",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="12" width="6" height="9" rx="1"/><path d="M12 12V9"/><path d="M12 9 C13.5 7 13.5 5 12 3.5 C10.5 5 10.5 7 12 9Z" fill="rgba(255,200,80,0.85)" stroke="rgba(255,160,40,0.9)" stroke-width="1"/><line x1="9" y1="15" x2="9" y2="17" stroke="rgba(255,255,255,0.35)" stroke-width="1"/></svg>` },
            { label: "Fireplace", entity: "YOUR_LIVING_ROOM_FIREPLACE_SCENE_ENTITY",    color: "#8b3a10",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14c0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-1.5-1-3-2-4 0 2-1 3-1 3s-.5-2-1.5-4c-1 2-2 3.5-2 4.5z"/><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/><line x1="3" y1="21" x2="21" y2="21"/></svg>` },
          ],
        },
        {
          label: "Bedroom",
          scenes: [
            { label: "Nightlight", entity: "YOUR_BEDROOM_NIGHTLIGHT_SCENE_ENTITY",      color: "#6b3800",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>` },
            { label: "Romantic",   entity: "YOUR_BEDROOM_ROMANTIC_SCENE_ENTITY",         color: "#8b2252",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>` },
            { label: "Candle",     entity: "YOUR_BEDROOM_CANDLE_SCENE_ENTITY",           color: "#7a4a1e",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="12" width="6" height="9" rx="1"/><path d="M12 12V9"/><path d="M12 9 C13.5 7 13.5 5 12 3.5 C10.5 5 10.5 7 12 9Z" fill="rgba(255,200,80,0.85)" stroke="rgba(255,160,40,0.9)" stroke-width="1"/><line x1="9" y1="15" x2="9" y2="17" stroke="rgba(255,255,255,0.35)" stroke-width="1"/></svg>` },
            { label: "Fireplace",  entity: "YOUR_BEDROOM_FIREPLACE_SCENE_ENTITY",        color: "#8b3a10",
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14c0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-1.5-1-3-2-4 0 2-1 3-1 3s-.5-2-1.5-4c-1 2-2 3.5-2 4.5z"/><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/><line x1="3" y1="21" x2="21" y2="21"/></svg>` },
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
