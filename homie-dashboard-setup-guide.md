# Homie Dashboard — Setup Guide

This guide walks you through everything needed to get the dashboard fully working on your own Home Assistant instance. Work through the sections in order — each one builds on the previous.

---

## Prerequisites

Before you start, make sure you have:

- A running HA instance 2023.x or newer
- The dashboard HTML file (`homie-dashboard.html`) saved in config/www folder of your HA
- A plain text editor such as Notepad to edit the html file
- The dashboard served from the same network as your HA instance (a phone, tablet, or browser on your local network)
- A Long-Lived Access Token — generate one at HA → Profile → Security → Long-Lived Access Tokens
- A websocket url ws://YOUR_HA_IP:8123/api/websocket


---

## Step 1 — Find your Home Assistant IP address

The dashboard connects to HA over your local network, so you need to know its address.

1. Open Home Assistant in your browser
2. Look at the URL bar — it will show something like `http://192.168.1.100:8123` or `http://homeassistant.local:8123`
3. Note that address — you will use it in Step 3

> If your HA is served over HTTPS (e.g. via Nabu Casa or a reverse proxy), note `https://` and you will use `wss://` instead of `ws://` in Step 3.

---

## Step 2 — Generate a Long-Lived Access Token

The dashboard authenticates with HA using a token instead of a password.

1. In HA, click your **username** in the bottom-left sidebar to open your Profile
2. Go to Security at the top of the page
3. Scroll to the bottom of the Profile page to **Long-Lived Access Tokens**
4. Click **Create Token**
5. Give it a name (e.g. `Homie Dashboard`) and click **OK**
6. **Copy the token immediately** — HA will never show it again
7. Keep it somewhere safe temporarily while you complete the setup

---

## Step 3 — Connect the dashboard to your HA instance

Open `homie-dashboard.html` in your text editor.

Use **Find & Replace** (Ctrl+H / Cmd+H) to make these two replacements:

| Find | Replace with |
|------|-------------|
| `YOUR_HA_LONG_LIVED_ACCESS_TOKEN` | The token you copied in Step 2 |
| `YOUR_HA_IP:8123` | Your HA address from Step 1 (e.g. `192.168.1.100:8123`) |

> If your HA uses HTTPS, also change `ws://` to `wss://` in the `wsUrl` line.

**Test it now** — open the file in your browser. If the clock shows, the background loads, and you do not see a red "Connection Lost" banner, you are connected. The stats and sensors will show `—` until you fill in entities in the next steps.

---

## Step 4 — How to find entity IDs in Home Assistant

Every sensor, light, switch, and device in HA has an entity ID — a unique string like `light.living_room` or `sensor.bedroom_temperature`. You will need these for all the steps below.

**To find an entity ID:**
1. In HA, go to **Settings → Developer Tools → States**
2. Use the search/filter box to find the device or sensor you want
3. The entity ID is shown on the left column in the format `domain.name`

Alternatively, go to **Settings → Devices & Services → Entities**, find the device, open it, and click the entity to see its ID.

Keep this page open in a separate tab — you will refer to it throughout setup.

---

## Step 5 — Set the background image

In the file, find `YOUR_BACKGROUND_IMAGE_URL` and replace it with either:

- A public image URL, e.g. from [Unsplash](https://unsplash.com) — right-click any photo → Copy Image Address. Append `?w=1200&q=80` for a smaller file size.
- A local image served by HA — place the image in your HA `config/www/` folder and reference it as `/local/your-image.jpg`

---

## Step 6 — Fill in the overview stats

These are the 5–10 summary tiles shown in the center of the dashboard (Doors, Alarm, Lights, etc.).

Find the `homeStats` section in the file. For each entry, replace the entity placeholder with the real entity ID from your HA:

```
{ label: "Doors",     entity: "binary_sensor.YOUR_DOORS_SENSOR", ... }
{ label: "Windows",   entity: "binary_sensor.YOUR_DOORS_SENSOR", ... }
{ label: "Alarm",     entity: "alarm_control_panel.YOUR_ALARM",  ... }
{ label: "Cameras",   entity: "switch.YOUR_CAMERA_PRIVACY_SWITCH", ... }
{ label: "Motion",    entity: "binary_sensor.YOUR_MOTION_SENSOR", ... }
{ label: "Lights",    entity: "light.YOUR_ALL_LIGHTS_GROUP",      ... }
{ label: "Air Con",   entity: "group.YOUR_ALL_AC_GROUP",          ... }
{ label: "Purifiers", entity: "fan.YOUR_ALL_PURIFIERS_GROUP",     ... }
{ label: "W. Heater", entity: "switch.YOUR_WATER_HEATER",         ... }
{ label: "T. Warmer", entity: "group.YOUR_ALL_AC_GROUP",          ... }
```

**Tips:**
- For grouped states (all lights on/off), create a **Light Group** or **Group** helper in HA that covers all your lights, then use that group's entity ID
- You can remove any rows you don't need by deleting the whole `{ label: ... }` line
- You can add new rows following the same pattern — up to 10 display in a 5-column grid

---

## Step 7 — Weather

Find `weather.YOUR_WEATHER_ENTITY` and replace it with your HA weather entity.

Most HA installations have a default weather entity already — check Developer Tools → States and filter by `weather.` to find yours (commonly `weather.home` or `weather.forecast_home`).

If you prefer Fahrenheit, change `"°C"` to `"°F"` on the line below it.

---

## Step 8 — Floor sensors (bottom bar)

The sensor bar at the bottom shows temperature, humidity, and air quality for two floors.

Find the `floorSensors` section and replace each entity:

**First Floor (ground):**
- `sensor.YOUR_FLOOR1_TEMPERATURE` → your first floor temperature sensor
- `sensor.YOUR_FLOOR1_HUMIDITY` → your first floor humidity sensor
- `sensor.YOUR_FLOOR1_PM25` → your first floor PM2.5 / air quality sensor

**Second Floor (upper):**
- `sensor.YOUR_FLOOR2_TEMPERATURE` → your second floor temperature sensor
- `sensor.YOUR_FLOOR2_HUMIDITY` → your second floor humidity sensor
- `sensor.YOUR_FLOOR2_PM25` → your second floor PM2.5 / air quality sensor

**Power sensor:**
- `sensor.YOUR_POWER_CONSUMPTION` → your whole-home energy/power sensor (in kW)

> If you don't have PM2.5 sensors, you can substitute any other sensor (e.g. CO₂). Change the `unit` value to match.

---

## Step 9 — Solar panel (bottom bar)

If you have a solar inverter integrated with HA, fill in the four solar entities:

- `sensor.YOUR_SOLAR_PRODUCTION` → current solar generation (kW)
- `sensor.YOUR_SOLAR_EXPORT` → power being exported to the grid (kW)
- `sensor.YOUR_BATTERY_SOC` → battery state of charge (%)
- `sensor.YOUR_INVERTER_TEMP` → inverter temperature (°C)

> If you don't have solar, you can hide this section by finding the `solarSensors` block and setting each entity to `null`. The solar pill will simply show dashes.

---

## Step 10 — Lights

Find the `controls` section, then the `Lights` chip entry. Under `subGroups`, each group represents a room. Replace every `entity` placeholder with your actual light entity IDs:

```
{ label: "Living", subEntities: [
    { label: "Center",     entity: "light.YOUR_LIVING_ROOM_LIGHTS" },
    { label: "Table",      entity: "light.YOUR_TABLE_LIGHTS" },
    ...
]}
```

**To customise rooms and groups:**
- Rename any `label` to match your room names
- Add or remove `{ label: "...", entity: "..." }` lines within a group
- Add an entirely new room group by copying one `{ label: "...", subEntities: [...] }` block and updating it
- Remove a room group you don't need by deleting the entire block

**Important:** Light entities must start with `light.` for the brightness slider and colour controls to appear in the popup.

Also replace:
- `light.YOUR_ALL_LIGHTS_GROUP` → a Light Group or group entity that covers all lights (used by the chip toggle and the homeStats tile)
- `sensor.YOUR_LIGHTS_ON_COUNT` → a template sensor that counts how many lights are on (used for the badge counter on the chip). If you don't have this, remove the `countEntity` line.

---

## Step 11 — Scenes

Find the `Scenes` chip entry in `controls`. Each scene entry looks like:

```
{ label: "Relax", entity: "automation.YOUR_LIVING_RELAX", color: "#4a2d7a", icon: `...` }
```

Replace each `automation.YOUR_*` with the automation or script entity ID that triggers that scene in your HA.

- The `label` is the name shown on the bubble
- The `color` is the background colour of the bubble (any CSS hex colour)
- The `icon` is an inline SVG — leave these unchanged unless you want to customise them

To add or remove scenes, copy or delete individual `{ label: ... }` lines. To add a new scene group (e.g. a third room), copy an entire `{ label: "...", scenes: [...] }` block.

---

## Step 12 — Air conditioning

Find the `Air Con` chip entry. Replace each `climate.YOUR_*` with your climate entity IDs:

```
{ label: "Living",  entity: "climate.YOUR_LIVING_AC" },
{ label: "Dining",  entity: "climate.YOUR_DINING_AC" },
...
```

Also replace:
- `group.YOUR_ALL_AC_GROUP` → a group covering all AC units (for the chip-level toggle)
- `sensor.YOUR_AIRCON_ON_COUNT` → a template sensor counting how many units are on

**Important:** These entities must start with `climate.` for the AC card (mode, fan speed, temperature controls) to appear.

---

## Step 13 — Air purifiers

Find the `Purifiers` chip entry. Replace each `fan.YOUR_*` with your purifier entity IDs:

```
{ label: "Living",  entity: "fan.YOUR_LIVING_PURIFIER" },
{ label: "Office",  entity: "fan.YOUR_OFFICE_PURIFIER" },
{ label: "Bedroom", entity: "fan.YOUR_BEDROOM_PURIFIER" },
```

Also replace:
- `fan.YOUR_ALL_PURIFIERS_GROUP` → a group covering all purifiers
- `sensor.YOUR_PURIFIERS_ON_COUNT` → a template sensor counting how many are on

**Important:** These must start with `fan.` for the purifier speed card to appear.

---

## Step 14 — Blinds and curtains

Find the `Blinds` chip entry. Replace each `cover.YOUR_*`:

```
{ label: "Living",  entity: "cover.YOUR_LIVING_BLINDS" },
{ label: "Dining",  entity: "cover.YOUR_DINING_BLINDS", isCurtain: true },
...
```

- Entities must start with `cover.` for the open/close/stop controls to appear
- Add `isCurtain: true` to any entry that is a horizontal curtain (flips the arrow direction)
- Remove entries for rooms where you have no blinds

Also replace `cover.YOUR_ALL_BLINDS_GROUP` with a group covering all your covers.

---

## Step 15 — Bathroom controls

Find the `Bath` chip entry. It has three sub-sections: House (water heater and hot water circulation), Main Bath, and Ensuite.

Replace each entity:

| Placeholder | What it controls |
|-------------|-----------------|
| `switch.YOUR_WATER_HEATER` | Whole-home water heater switch |
| `switch.YOUR_HW_CIRC_KITCHEN` | Hot water circulation — kitchen zone |
| `switch.YOUR_HW_CIRC_MAIN_BATH` | Hot water circulation — main bath zone |
| `switch.YOUR_HW_CIRC_ENSUITE` | Hot water circulation — ensuite zone |
| `fan.YOUR_MAIN_BATH_FAN` | Main bathroom extractor fan |
| `switch.YOUR_MAIN_BATH_TOWEL_WARMER` | Main bath towel warmer switch |
| `fan.YOUR_ENSUITE_FAN` | Ensuite extractor fan |
| `switch.YOUR_ENSUITE_TOWEL_WARMER` | Ensuite towel warmer switch |

Remove any entries you don't have. If you have no hot water circulation at all, delete the entire `HW Circulation` expandable block.

---

## Step 16 — Irrigation

Find the `Irrigation` chip entry and replace:

- `switch.YOUR_IRRIGATION_FRONT` → your front garden irrigation switch
- `switch.YOUR_IRRIGATION_BACK` → your back garden irrigation switch

Add or remove zone entries to match the number of zones you have.

---

## Step 17 — Music player

Find `media_player.YOUR_MEDIA_PLAYER` and replace it with your HA media player entity (e.g. a Spotify integration, a Sonos player, or a local media player).

The Now Playing bar will appear automatically at the bottom of the screen whenever music is actively playing.

---

## Step 18 — Calendar

Find the `calendarEntities` line:

```js
calendarEntities: ["calendar.YOUR_CALENDAR_1", "calendar.YOUR_CALENDAR_2"],
```

Replace each entry with the entity IDs of your HA calendar integrations. You can have as many or as few as you like — add more by adding `"calendar.your_calendar"` entries separated by commas, or remove the second entry if you only have one calendar.

---

## Step 19 — Notifications

Find the `notifications` section. Each entry defines a sensor or input_boolean that, when `on`, triggers a banner at the top of the dashboard.

Replace each entity placeholder with your own binary sensors or input_booleans. You can:
- Rename the `label` to describe the reminder
- Remove any rows you don't want
- Add new rows following the same `{ label: "...", entity: "..." }` pattern

---

## Step 20 — Pet stats (optional)

If you don't have a pet or don't want this feature, skip to Step 21.

Find `petName: "YOUR_PET_NAME"` and replace it with your pet's name. This updates both the button label and the popup title automatically.

Then replace each sensor in the `petStats` block:

| Placeholder | What it tracks |
|-------------|---------------|
| `sensor.YOUR_PET_LITTER_USES_TODAY` | Litter box visits today |
| `sensor.YOUR_PET_LITTER_LAST_USED` | Timestamp of last litter box use |
| `sensor.YOUR_PET_FOOD_COUNT` | Food portions dispensed today |
| `sensor.YOUR_PET_FOOD_WEIGHT` | Total food weight dispensed today (g) |
| `sensor.YOUR_PET_FOOD_DESICCANT` | Days left on feeder desiccant pack |
| `sensor.YOUR_PET_WATER_TODAY` | Water dispensed today (ml) |
| `sensor.YOUR_PET_WATER_FILTER` | Water fountain filter life (%) |

If you only have some of these sensors, set the ones you don't have to `null` (no quotes).

Also update the two notification label entries that contain `YOUR_PET_NAME`:
```
{ label: "YOUR_PET_NAME Litter Box Needs Cleaning", ... }
{ label: "YOUR_PET_NAME Food/Water Problem",        ... }
```

---

## Step 21 — Serve the file

The dashboard must be opened from a device on the same local network as your HA instance. There are two ways to do this:

**Option A — Serve from Home Assistant (recommended)**
1. Copy `homie-dashboard.html` into your HA `config/www/` folder
2. Access it in a browser at `http://YOUR_HA_IP:8123/local/homie-dashboard.html`

**Option B — Open directly in a browser**
1. Open the HTML file directly in Chrome, Firefox, or Safari on any device on your local network
2. The browser may warn about local file access — allow it


---

## Step 22 — Verify everything works

Work through this checklist once the dashboard is open:

- [ ] Clock and date display correctly in the top-left
- [ ] Weather icon and temperature appear at the top-centre
- [ ] The overview stats (Doors, Alarm, Lights, etc.) show real values, not `—`
- [ ] The floor sensor bar at the bottom shows temperature, humidity, and PM2.5
- [ ] The solar bar shows live production and battery values
- [ ] No red "Connection Lost" banner appears
- [ ] Tapping a chip (Lights, Air Con, etc.) opens a popup with your devices
- [ ] Toggles and sliders in popups control your devices in HA
- [ ] The Now Playing bar appears when music is playing
- [ ] The Calendar button shows upcoming events

---

## Troubleshooting

**Red "Connection Lost" banner**
The dashboard cannot reach HA. Check that the `wsUrl` in the file exactly matches your HA address and port, and that you are on the same network. If HA uses HTTPS, make sure you used `wss://` not `ws://`.

**Stats and sensors all show `—`**
The connection is working but entity IDs are wrong. Open HA Developer Tools → States and verify the entity ID matches exactly what is in the file — IDs are case-sensitive.

**A chip popup shows no devices**
The entities in that chip's `subEntities` list either have wrong IDs or are unavailable in HA. Check each one in Developer Tools → States.

**AC/Purifier popup shows a plain toggle instead of the full card**
The entity ID does not start with the correct domain. AC entities must start with `climate.`, purifiers with `fan.`, lights with `light.`, blinds with `cover.`.

**The Now Playing bar never appears**
Check that your `musicEntity` is a `media_player.*` entity and that it reports state as `playing` in HA when music is active.

**CORS or network errors in the browser console**
The file must be accessed from the same origin as HA (served via `/local/`) or from a local browser on the same network. Hosting it on an external server will fail due to browser security restrictions.
