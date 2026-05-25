# Homie Dashboard — Setup Guide

This guide walks you through everything needed to get the dashboard fully working on your own Home Assistant instance. Work through the sections in order — each one builds on the previous.

NOTE: Since v2.0.0 the configuration has been decoupled. You ONLY need to edit the config.js file. Do NOT edit anything in the html file unless you know what you are doing.

TIP: Search for "YOUR_" in the config.js to find every value you need to personalise.

---

## Prerequisites

Before you start, make sure you have:

- A running HA instance 2023.x or newer
- The dashboard HTML file (`homie-dashboard.html`) saved in config/www folder of your HA
- The config file (`config.js`) saved in config/www folder of your HA
- The photos you will like to display in the Memories Dashboard in config/www/photos
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

Open `config.js` in your text editor.

Use **Find & Replace** (Ctrl+H / Cmd+H) to make these two replacements:

| Find | Replace with |
|------|-------------|
| `YOUR_LONG_LIVED_ACCESS_TOKEN` | The token you copied in Step 2 |
| `YOUR_WEBSOCKET_URL` | Your HA address from Step 1 (e.g. `192.168.1.100:8123`) |

> If your HA uses HTTPS, also change `ws://` to `wss://` in the `wsUrl` line.

**Test it now** — open the file in your browser. If the clock shows etc, and you do not see a red "Connection Lost" banner, you are connected. The stats and sensors will show `—` until you fill in entities in the next steps.

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

## Step 5 — Fill in the overview stats

These are the 5–10 summary tiles shown in the center of the dashboard (Doors, Alarm, Lights, etc.).

Find the `homeStats` section in the file. For each entry, replace the entity placeholder with the real entity ID from your HA:

```
{ label: "Doors",     entity: "YOUR_ALL_DOORS_ENTITY", ... }
{ label: "Windows",   entity: "YOUR_ALL_WINDOWS_ENTITY", ... }
{ label: "Alarm",     entity: "YOUR_ALARM_ENTITY",  ... }
{ label: "Cameras",   entity: "YOUR_CAMERA_PRIVACY_ENTITY", ... }
{ label: "Motion",    entity: "YOUR_ALL_MOTION_SENSORS_ENTITY", ... }
{ label: "Lights",    entity: "YOUR_ALL_LIGHTS_ENTITY",      ... }
{ label: "Air Con",   entity: "YOUR_ALL_AC_GROUP_ENTITY",          ... }
{ label: "Purifiers", entity: "YOUR_ALL_PURIFIERS_ENTITY",     ... }
{ label: "W. Heater", entity: "YOUR_WATER_HEATER_ENTITY",         ... }
{ label: "T. Warmer", entity: "YOUR_TOWEL_WARMER_ENTITY",          ... }
```

**Tips:**
- For grouped states (all lights on/off), create a **Light Group** or **Group** helper in HA that covers all your lights, then use that group's entity ID
- You can remove any rows you don't need by deleting the whole `{ label: ... }` line
- You can add new rows following the same pattern — up to 10 display in a 5-column grid

---

## Step 6 — Weather

Find `YOUR_WEATHER_ENTITY` and replace it with your HA weather entity.

Most HA installations have a default weather entity already — check Developer Tools → States and filter by `weather.` to find yours (commonly `weather.home` or `weather.forecast_home`).

If you prefer Fahrenheit, change `"°C"` to `"°F"` on the line below it.

---

## Step 7 — Floor sensors (bottom bar)

The sensor bar at the bottom shows temperature, humidity, and air quality for two floors.

Find the `floorSensors` section and replace each entity:

**First Floor (ground):**
- `YOUR_FIRST_FLOOR_TEMP_ENTITY` → your first floor temperature sensor
- `YOUR_FIRST_FLOOR_HUMIDITY_ENTITY` → your first floor humidity sensor
- `YOUR_FIRST_FLOOR_PM25_ENTITY` → your first floor PM2.5 / air quality sensor

**Second Floor (upper):**
- `YOUR_SECOND_FLOOR_TEMP_ENTITY` → your second floor temperature sensor
- `YOUR_SECOND_FLOOR_HUMIDITY_ENTITY` → your second floor humidity sensor
- `YOUR_SECOND_FLOOR_PM25_ENTITY` → your second floor PM2.5 / air quality sensor

**Power sensor:**
- `YOUR_POWER_SENSOR_ENTITY` → your whole-home energy/power sensor (in kW)

> If you don't have PM2.5 sensors, you can substitute any other sensor (e.g. CO₂). Change the `unit` value to match.

---

## Step 8 — Solar panel (bottom bar)

If you have a solar inverter integrated with HA, fill in the four solar entities:

- `YOUR_SOLAR_PRODUCTION_ENTITY` → current solar generation (kW)
- `YOUR_SOLAR_EXPORT_ENTITY` → power being exported to the grid (kW)
- `YOUR_BATTERY_SOC_ENTITY` → battery state of charge (%)
- `YOUR_INVERTER_TEMP_ENTITY` → inverter temperature (°C)

> If you don't have solar, you can hide this section by finding the `solarSensors` block and setting each entity to `null`. The solar pill will simply show dashes.

---

## Step 9 
You should get the idea by now. The config file makes it easy and it's pretty well documented to follow through. 
Continue searching for the rest of "YOUR_" in the config.js to replace the entities with your own ones.


---

## Step 10 — Serve the file

The dashboard must be opened from a device on the same local network as your HA instance. There are two ways to do this:

**Option A — Serve from Home Assistant (recommended)**
1. Copy `homie-dashboard.html` and `config.js` into your HA `config/www/` folder
2. Access it in a browser at `http://YOUR_HA_IP:8123/local/homie-dashboard.html`

**Option B — Open directly in a browser (not recommended)**
1. Open the HTML file directly in Chrome, Firefox, or Safari on any device on your local network
2. The browser may warn about local file access — allow it
3. Due to CORS not all elements such as the calendar will not load, so Option A is the best way


---

## Step 11 — Verify everything works

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
- [ ] The Calendar dashboard shows upcoming events, todo etc.

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
