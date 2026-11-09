/* ═══════════════════════════════════════════════════════════════════════════
 * Homie Dashboard — built-in defaults
 * Everything you pick in the Setup wizard is layered on top of these values.
 * Do not edit: this file is replaced on every update. Use the Setup wizard
 * (Settings → About → Open setup) or the Advanced step to customise.
 * "@icon:x.y" = built-in dashboard icon ICONS.x.y,  "@inf" = Infinity
 * ═══════════════════════════════════════════════════════════════════════════ */
window.HOMIE_DEFAULTS = {
  "greetingSlots": [
    {
      "slot": "morning",
      "from": 5,
      "label": "GOOD MORNING"
    },
    {
      "slot": "afternoon",
      "from": 12,
      "label": "GOOD AFTERNOON"
    },
    {
      "slot": "evening",
      "from": 18,
      "label": "GOOD EVENING"
    },
    {
      "slot": "night",
      "from": 22,
      "label": "GOOD NIGHT"
    }
  ],
  "alarmEntity": "",
  "security": [],
  "alarmGroups": [],
  "alarmUi": {
    "sirenEntity": ""
  },
  "weather": {
    "entity": "",
    "tempUnit": "°C"
  },
  "sun": {
    "sunrise": "",
    "sunset": "",
    "timezone": ""
  },
  "aqi": {
    "entity": "",
    "pm25": "",
    "pm10": "",
    "co": "",
    "no2": "",
    "bands": [
      {
        "max": 50,
        "label": "Good",
        "color": "#4caf8a",
        "text": "The air is in standard level and is healthy for everyone."
      },
      {
        "max": 100,
        "label": "Moderate",
        "color": "#f0c040",
        "text": "Air quality is acceptable; some pollutants may affect sensitive groups."
      },
      {
        "max": 150,
        "label": "Unhealthy for Sensitive Groups",
        "color": "#f08040",
        "text": "Members of sensitive groups may experience health effects."
      },
      {
        "max": 200,
        "label": "Unhealthy",
        "color": "#e04040",
        "text": "Everyone may begin to experience health effects."
      },
      {
        "max": 300,
        "label": "Very Unhealthy",
        "color": "#9c40a0",
        "text": "Health warnings of emergency conditions."
      },
      {
        "max": "@inf",
        "label": "Hazardous",
        "color": "#7e0023",
        "text": "Health alert: everyone may experience serious health effects."
      }
    ]
  },
  "moon": {
    "entity": ""
  },
  "homeStats": [],
  "floorSensors": [],
  "solar": {
    "sensorRow": [],
    "stats": [],
    "dailyChart": [],
    "dailyChartDays": 5
  },
  "musicPlayers": [],
  "musicHideDelay": 10000,
  "calendarEntities": [],
  "mealCalendarEntity": "",
  "calendarDashboard": {
    "labels": {},
    "colors": {}
  },
  "mealSlots": [
    {
      "key": "breakfast",
      "label": "Breakfast",
      "icon": "@icon:meals.breakfast",
      "hour": 9
    },
    {
      "key": "lunch",
      "label": "Lunch",
      "icon": "@icon:meals.lunch",
      "hour": 13
    },
    {
      "key": "snack",
      "label": "Snack",
      "icon": "@icon:meals.snack",
      "hour": 16
    },
    {
      "key": "dinner",
      "label": "Dinner",
      "icon": "@icon:meals.dinner",
      "hour": 19
    }
  ],
  "notifications": [],
  "echoTimers": [],
  "wazeTravelTime": [],
  "cameraRefreshSeconds": 1,
  "cameraLiveStream": true,
  "cameraShowStats": true,
  "cameraGridLive": true,
  "cameraGridChannel": "auto",
  "cameras": [],
  "doorbell": {
    "buttonEntity": "",
    "cameraEntity": "",
    "label": "Doorbell · Front Door"
  },
  "petName": "",
  "petStats": {
    "litterCount": "",
    "litterLast": "",
    "litterCounter": "",
    "litterResetAuto": "",
    "litterCleanBoolean": "",
    "foodCount": "",
    "foodWeight": "",
    "foodDes": "",
    "waterVol": "",
    "waterFilter": "",
    "desiccantMaxDays": 30,
    "litterChart": {
      "okMax": 5,
      "warnMax": 10,
      "colors": {
        "ok": "#22a722",
        "warn": "#f59e0b",
        "high": "#ef4444"
      }
    }
  },
  "habitsMoodHistoryEntities": {
    "habits": "",
    "mood": ""
  },
  "moods": [
    {
      "key": "great",
      "icon": "😄",
      "label": "Great"
    },
    {
      "key": "good",
      "icon": "😊",
      "label": "Good"
    },
    {
      "key": "okay",
      "icon": "😐",
      "label": "Okay"
    },
    {
      "key": "meh",
      "icon": "😕",
      "label": "Meh"
    },
    {
      "key": "bad",
      "icon": "😢",
      "label": "Bad"
    }
  ],
  "habits": [
    {
      "key": "water",
      "label": "Hydrate",
      "icon": "@icon:habits.water"
    },
    {
      "key": "workout",
      "label": "Workout",
      "icon": "@icon:habits.workout"
    },
    {
      "key": "read",
      "label": "Read",
      "icon": "@icon:habits.read"
    },
    {
      "key": "meditate",
      "label": "Meditate",
      "icon": "@icon:habits.meditate"
    },
    {
      "key": "snacks",
      "label": "Snacks",
      "icon": "@icon:habits.snacks"
    }
  ],
  "controls": [],
  "garden": {
    "soilMoisture": [],
    "thresholds": {
      "dryBelow": 30,
      "wetAbove": 80
    }
  }
};
