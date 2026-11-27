# Kiosk Satellite setup and automations

This guide shows how to run Homie Dashboard on a wall tablet with Kiosk Satellite, and how to control the tablet from Home Assistant: open a Homie screen when music plays, and switch the screen on and off with a presence sensor.

[← Back to the README](../README.md)

**On this page**
[What you will set up](#what-you-will-set-up) · [Before you start](#before-you-start) · [1. Test the deeplinks first](#1-test-the-deeplinks-first) · [2. Install and connect Kiosk Satellite](#2-install-and-connect-kiosk-satellite) · [3. Check the entities in Home Assistant](#3-check-the-entities-in-home-assistant) · [4. Remote Management API](#4-remote-management-api) · [5. REST commands](#5-rest-commands) · [6. Automations](#6-automations) · [Troubleshooting](#troubleshooting)

## What you will set up

An Android tablet runs Kiosk Satellite as a dedicated display. Home Assistant controls the tablet in two ways:

- **ESPHome integration:** Kiosk Satellite appears in Home Assistant as an ESPHome device, with a screen light you can turn on and off.
- **Remote Management API:** Home Assistant sends commands (screen on, bring to front, load a web address) to the tablet through `rest_command` actions.

With those two in place you can build automations such as:

- Music starts playing, and the tablet opens the Homie **Now Playing** screen. When it stops, the tablet returns to its normal start page.
- A presence sensor switches the screen on when someone is in the room and off after a delay, but keeps it on while music is playing.

Start with step 1 to check that the links work, then follow steps 2 to 6 in order.

## Before you start

You need:

- A tablet with Kiosk Satellite installed, on the same network as Home Assistant.
- Homie Dashboard installed and set up (see the [README](../README.md)).
- A long-lived access token for Home Assistant (created under your profile, **Security**). Kiosk Satellite asks for it when it connects.
- Optional, for the automations below: a media player (for example Spotify) and a presence or occupancy sensor.

Throughout this guide, replace the placeholders with your own values:

| Placeholder | Meaning | Example |
|---|---|---|
| `<HA_URL>` | The address you use to open Home Assistant | `http://192.168.1.20:8123` |
| `<TABLET_IP>` | The IP address of the tablet | `192.168.1.50` |
| `<KS_NODE>` | The ESPHome device name of the tablet (shown in Home Assistant) | `ks-mytablet` |
| `<SCREEN_LIGHT>` | The tablet's screen light entity | `light.mytablet_ks_screen` |
| `<MEDIA_PLAYER>` | The media player that should open Now Playing | `media_player.spotify_john` |
| `<PRESENCE_SENSOR>` | A presence or occupancy binary sensor | `binary_sensor.office_occupancy` |

Give the tablet a fixed IP address (a DHCP reservation in your router) so the address in your commands does not change.

## 1. Test the deeplinks first

**Included in Homie Dashboard v5.2.0 and newer.** Before you continue with the rest of this guide, test the deeplinks: type a link such as the one below into the browser of a device that is signed in to Home Assistant and check that the right screen opens. If a link opens the overview instead, check that you run v5.2.0 or newer and that the name is spelled as in the table below. The rest of this guide uses these links.

Add `?screen=` to the dashboard address to open one screen straight away, for example from an automation that loads a page on a wall tablet:

```
<HA_URL>/homie-dashboard?screen=nowplaying
```

For `<HA_URL>` use the address you normally open Home Assistant with, for example `http://192.168.1.20:8123`. The path `/homie-dashboard` is always the same, whatever you called the sidebar item.

The names are the same as the **Startup screen** options:

| Name | Opens |
|---|---|
| `overview1`, `overview2`, `overview3` | The three overview layouts. Use `overview1` to go back to the first one |
| `nowplaying` | Now Playing |
| `myday` | My Day |
| `memories` | Photo frame (Memories) |
| `thermostat` | Thermostat |
| `clock`, `clock-digital` | Analog and digital clock |
| `weather` | Weather |
| `cameras` | Cameras |
| `solar` | Solar |
| `indooraqi` | Indoor air quality |
| `indoorpresence` | Indoor presence |
| `alarm` | Alarm |
| `pet` | Pet |
| `car` | Car (only when a car is set up) |

- A link only affects that visit. Your saved Startup screen is not changed, and reloading the page without the link returns to it.
- If the dashboard is already open and the address changes without a reload, the screen switches right away. Any screensaver stops and any other full-screen screen closes first, as if you had touched the tablet.
- An unknown name is ignored.
- Opening the link does not wake a sleeping tablet screen. A web page cannot do that, so wake the tablet with your kiosk app first (with Kiosk Satellite, use the `tablet_screen_on` command or the screen light, see [section 6](#6-automations)).

## 2. Install and connect Kiosk Satellite

Menu wording can vary slightly between app versions.

1. Install the latest Kiosk Satellite Android APK on the tablet and open it.
2. Complete the setup wizard. Enter your Home Assistant address (`<HA_URL>`) and the long-lived access token when asked.
3. Choose the Homie Dashboard as the start page. The start address is `<HA_URL>/homie-dashboard`.
4. Open **Settings → ESPHome** and enable the ESPHome connection. Complete the connection details the app asks for.
5. Turn on **Expose kiosk entities** in the ESPHome settings. This makes the tablet's controls available in Home Assistant.
6. Open **Settings → Device → Remote Administration**, enable **Remote Management** and set an administrator password. The server uses port `2324` by default.
7. From a computer on the same network, open `http://<TABLET_IP>:2324` in a browser to confirm the tablet answers.
8. In Home Assistant, add the **ESPHome** integration if the tablet was not discovered automatically, then finish the pairing (and the encryption key, if asked).

## 3. Check the entities in Home Assistant

Open **Settings → Devices & services → ESPHome** and find the tablet (`<KS_NODE>`). Kiosk Satellite exposes entities depending on the features you enabled and the tablet's hardware. The one you need is the **Screen** light, which turns the screen on and off and sets its brightness. Note its entity id as `<SCREEN_LIGHT>`. Camera entities only appear on tablets that have a camera.

Also note the entity ids of your media player (`<MEDIA_PLAYER>`) and presence sensor (`<PRESENCE_SENSOR>`) if you want the automations in [section 6](#6-automations).

## 4. Remote Management API

The API uses a **Bearer token** created from the Remote Management password. This token is separate from the Home Assistant token that Kiosk Satellite uses to connect to Home Assistant.

**Create the token** (Windows PowerShell; enter the Remote Management password when asked, and do not share the password or the token):

```powershell
$password = Read-Host "Kiosk Satellite password"
$body = @{ password = $password; ttl_days = 3650 } | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://<TABLET_IP>:2324/api/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

On macOS or Linux, the same request with `curl`:

```bash
curl -X POST "http://<TABLET_IP>:2324/api/login" \
  -H "Content-Type: application/json" \
  -d '{"password": "YOUR_PASSWORD", "ttl_days": 3650}'
```

A successful login returns a token. 3650 days is the longest lifetime the API accepts. If you tried a wrong password several times, wait for the temporary login limit to expire first. Treat the token like a password.

**Store it in `secrets.yaml`.** Include the word `Bearer` and a space in front of the token:

```yaml
kiosk_satellite_token: "Bearer YOUR_GENERATED_TOKEN"
```

The `Bearer ` prefix must be part of the secret, because the REST commands below use the secret value as the whole `Authorization` header. Without it Home Assistant gets a `401 Unauthorized` answer.

## 5. REST commands

Add this line at the top level of `configuration.yaml` (skip it if you already include a file for `rest_command`):

```yaml
rest_command: !include rest_command.yaml
```

Create `rest_command.yaml` in the same folder as `configuration.yaml`. Do not add another `rest_command:` heading inside this file.

```yaml
tablet_screen_on:
  url: "http://<TABLET_IP>:2324/api/commands/screenOn"
  method: POST
  headers:
    Authorization: !secret kiosk_satellite_token
  content_type: "application/json"
  payload: "{}"

tablet_bring_to_front:
  url: "http://<TABLET_IP>:2324/api/commands/bringToFront"
  method: POST
  headers:
    Authorization: !secret kiosk_satellite_token
  content_type: "application/json"
  payload: "{}"

tablet_load_now_playing:
  url: "http://<TABLET_IP>:2324/api/commands/loadUrl"
  method: POST
  headers:
    Authorization: !secret kiosk_satellite_token
  content_type: "application/json"
  payload: >
    {
      "url": "<HA_URL>/homie-dashboard?screen=nowplaying"
    }

tablet_return_home:
  url: "http://<TABLET_IP>:2324/api/commands/loadStartUrl"
  method: POST
  headers:
    Authorization: !secret kiosk_satellite_token
  content_type: "application/json"
  payload: "{}"
```

What each command does:

| Command | What it does |
|---|---|
| `tablet_screen_on` | Wakes the tablet screen |
| `tablet_bring_to_front` | Brings Kiosk Satellite to the front if another app is on top |
| `tablet_load_now_playing` | Loads the Homie Now Playing screen (see [Deeplinks](#1-test-the-deeplinks-first) for other screens) |
| `tablet_return_home` | Loads the start address set in Kiosk Satellite |

**Check and test:**

1. Save `configuration.yaml`, `secrets.yaml` and `rest_command.yaml`.
2. Open **Developer Tools → YAML → Check configuration**.
3. **Restart Home Assistant.** It is needed after adding or changing REST commands or secrets.
4. In **Developer Tools → Actions**, run each `rest_command.tablet_...` action and watch the tablet. Test `tablet_return_home` too before relying on it.

**Open a different screen.** To open a screen other than Now Playing, use the deeplink names from [step 1](#1-test-the-deeplinks-first): copy `tablet_load_now_playing` under a new name and change the name after `?screen=` to one from the table in step 1, for example:

```yaml
tablet_load_cameras:
  url: "http://<TABLET_IP>:2324/api/commands/loadUrl"
  method: POST
  headers:
    Authorization: !secret kiosk_satellite_token
  content_type: "application/json"
  payload: >
    {
      "url": "<HA_URL>/homie-dashboard?screen=cameras"
    }
```

**Fully Kiosk Browser** users load the link with its own action instead of a REST command:

```yaml
action: fully_kiosk.load_url
data:
  device_id: <your tablet>
  url: "<HA_URL>/homie-dashboard?screen=nowplaying"
```

## 6. Automations

Both examples use the commands above. Replace the placeholders with your entities. In the UI, open **Settings → Automations & scenes → Create automation → Create new automation**, then the three dots (⋮) → **Edit in YAML** and paste the YAML.

### Open Now Playing while music plays

When the media player starts playing, the tablet wakes, comes to the front and opens Now Playing. When it leaves the playing state, the tablet returns to its start page.

```yaml
alias: Tablet - Now Playing
description: Show Homie Now Playing while music is playing.

triggers:
  - trigger: state
    entity_id: <MEDIA_PLAYER>
    to: "playing"
    id: playing

  - trigger: state
    entity_id: <MEDIA_PLAYER>
    from: "playing"
    id: stopped

actions:
  - choose:
      - conditions:
          - condition: trigger
            id: playing
        sequence:
          - action: rest_command.tablet_screen_on
          - action: rest_command.tablet_bring_to_front
          - delay:
              seconds: 2
          - action: rest_command.tablet_load_now_playing

      - conditions:
          - condition: trigger
            id: stopped
        sequence:
          - action: rest_command.tablet_bring_to_front
          - action: rest_command.tablet_return_home

mode: restart
```

The `stopped` trigger fires when the player changes from playing to any other state, including paused. To return home only when playback is idle or off, replace `from: "playing"` with the states you want, for example `to: "idle"`. If your player briefly changes state between tracks and the tablet flips back to the start page, add `for: seconds: 10` to the `stopped` trigger.

### Screen on with presence, off after a delay

The screen turns on when the presence sensor detects someone. After 30 seconds without presence it turns off, unless music is playing.

```yaml
alias: Tablet - Presence Screen
description: Switch the tablet screen with a presence sensor, keeping it on while music plays.

triggers:
  - trigger: state
    entity_id: <PRESENCE_SENSOR>
    to: "on"
    id: motion

  - trigger: state
    entity_id: <PRESENCE_SENSOR>
    to: "off"
    for:
      seconds: 30
    id: no_motion

actions:
  - choose:
      - conditions:
          - condition: trigger
            id: motion
        sequence:
          - action: light.turn_on
            target:
              entity_id: <SCREEN_LIGHT>

      - conditions:
          - condition: trigger
            id: no_motion
          - condition: not
            conditions:
              - condition: state
                entity_id: <MEDIA_PLAYER>
                state: "playing"
        sequence:
          - action: light.turn_off
            target:
              entity_id: <SCREEN_LIGHT>

mode: restart
```

Change `seconds: 30` to make the screen stay on longer. Skip the media player condition if you do not want music to keep the screen on.

The screen only turns off when the sensor changes to "off" and stays off for the delay. If music stops while nobody is in the room, the screen stays on until the sensor changes again. To switch it off when playback ends, add a second action to the `stopped` branch of the Now Playing automation that turns the screen light off when the sensor is off.

## Troubleshooting

| Problem | Fix |
|---|---|
| A `?screen=` link opens the overview | Check that Homie is v5.2.0 or newer, that the name matches the table in step 1 and that you are signed in. `car` only works once a car sensor is set up. |
| `401 Unauthorized` from a REST command | The secret must start with `Bearer ` (the word and a space) followed by the token. Create the token again if you are unsure. |
| The login for the token is refused | Too many wrong passwords trigger a temporary limit. Wait for it to expire, then try again with the Remote Management password. |
| `rest_command.tablet_...` does not exist | Check the `rest_command: !include rest_command.yaml` line, run **Check configuration** and restart Home Assistant. |
| A command fails with a connection error | Check that **Remote Management** is on, that `<TABLET_IP>` is right (use a fixed IP) and that `http://<TABLET_IP>:2324` opens from another device on the network. |
| The tablet shows the page but the screen stays dark | A link cannot wake the screen. Run `tablet_screen_on` or turn on the screen light first, as in the Now Playing automation. |
| The screen light is missing in Home Assistant | Check that the ESPHome connection and **Expose kiosk entities** are on in the app, and that the ESPHome device is added in Home Assistant. |
| The automation does not run | Open it in Home Assistant and check its **Traces** to see which trigger fired and where it stopped. |
