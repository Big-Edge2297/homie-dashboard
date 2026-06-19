# **Homie Dashboard**

![Release](https://img.shields.io/github/v/release/Big-Edge2297/homie-dashboard?style=for-the-badge) ![Downloads](https://img.shields.io/github/downloads/Big-Edge2297/homie-dashboard/total?style=for-the-badge) ![Latest Release Downloads](https://img.shields.io/github/downloads/Big-Edge2297/homie-dashboard/latest/total?style=for-the-badge)

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Dashboard-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/) [![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://hacs.xyz/) [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<img src="https://github.com/user-attachments/assets/b9f66b35-5209-4fa8-bdc9-f92d6ed60517" width="400"/> <img src="https://github.com/user-attachments/assets/f17ef08f-a525-45c3-9d25-d641c6c273de" width="400"/>

Homie Dashboard is a touch-first Home Assistant dashboard designed for wall-mounted tablets.

It provides a customizable overview of your home while supporting dedicated dashboard modes for music, calendars, weather, photos, thermostats, cameras, clocks, and solar monitoring.

Designed for:
✅ Wall-mounted tablets
✅ Dedicated Home Assistant displays
✅ Touch-first interfaces

Not designed for:
❌ Phones
❌ Desktop browsers as primary usage
❌ Small screens

[Screenshots](https://github.com/Big-Edge2297/homie-dashboard/blob/main/README.md#Screenshots) · [Installation](https://github.com/Big-Edge2297/homie-dashboard/blob/main/README.md#Installation) · [Security](https://github.com/Big-Edge2297/homie-dashboard/blob/main/README.md#security) · [Release Highlights](https://github.com/Big-Edge2297/homie-dashboard/blob/main/README.md#Release-Highlights)

## Quick Start

### HACS
1. Add the repository to HACS
2. Download Homie Dashboard
3. Register the resource
4. Create the dashboard
5. Configure config.js

### Standalone
1. Copy homie-dashboard.html and config.js to config/www
2. Configure config.js
3. Open:
http://YOUR_HA_IP:8123/local/homie-dashboard.html

## Screenshots

### Overview

| Overview Screen A | Overview Screen B | Overview Screen C |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/bbd44202-789c-4ba9-ac28-ebc9a16d9496" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/b5be80f2-b630-4e8b-a422-a19ab6d267b6" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/78939273-870f-43ba-9028-789a71b1a4f4" width="320" height="200"/> |

### Dashboards

| Now Playing Dashboard A | Now Playing Dashboard B | My Day Dashboard |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/af3968cd-ce95-440c-a24e-e4ee94902e3d" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/b968bae0-c504-4cd1-a3f9-93a1d54fba97" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/b1a05624-3e43-483d-a69e-0afe5af386e7" width="320" height="200"/> |

| Memories Dashboard | Thermostat Dashboard | Weather Dashboard |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/89f6fa97-5e8b-41eb-b788-558857f30bea" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/685e0e08-5dbd-420d-b429-4ad2ceaffdd1" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/feb4fa44-7f99-4359-ab4f-deea6915fce5" width="320" height="200"/> |

| Weather Dashboard | Clock Dashboard A | Clock Dashboard B |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/d0c54a8d-a417-45c2-b05b-fe930aa8d558" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/d96813db-dacb-401a-ad30-5c1d34249480" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/82c82e38-6267-42cb-b516-65deb13a299e" width="320" height="200"/> |

| Solar Dashboard | Camera Dashboard |
|--------|--------|
| <img src="https://github.com/user-attachments/assets/4e24b1e0-3364-460c-af53-bfcff242d699" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/fc70c54a-a8d6-4953-b335-4c58d4939c06" width="320" height="200"/> |


### Settings

| Settings | Themes | Bloom Intensity |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/7497a0ac-f620-4e40-b395-256104d32ad4" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/48618cbd-acfc-4f5c-be2d-2a420a8e3231" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/a153f728-e843-41ac-a6d8-1a063bc12d57" width="320" height="200"/> |

| Fonts | Languages | Elements Customization |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/e8afa1cd-63f2-4f9c-ada2-f875e51d7aae" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/93c7a8ee-b353-4487-b321-d85e3106fb88" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/f471f2f4-a630-434f-adda-94e00d576899" width="320" height="200"/> |


### Entities and other screens

| Pet Stats | Alarm Status | Lights |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/c3d8fb36-c271-43e3-aaae-064a454a47d1" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/0ec20e9d-604d-42d6-af8c-a3e9a942bc81" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/89d52cd2-bf4a-4153-8976-c82599caa683" width="320" height="200"/> |

| Scenes | AirCon | Blinds |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/e7f3b548-7c1d-434d-b05b-0dd217de039e" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/2e7e9043-120e-4ed1-9fa3-8dadd75654a9" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/b6f6191c-42a0-4dcf-9d75-c17f05e09222" width="320" height="200"/> |

| Habit History | Mood History | and Shumi 🐱 |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/dbfc0e7e-ee10-4f49-a716-b9f43e7213c5" width="320" height="557"/> | <img src="https://github.com/user-attachments/assets/4e0bdf03-5a79-4ea3-99e7-c6328223c79b" width="320" height="557"/> | <img src="https://github.com/user-attachments/assets/2b4c66f6-2b31-4a11-b967-55e7fc3f4b0a" width="320" height="557"/> |

## Themes

| Classic Gold | Deep Copper | Terracotta |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/0a2921f9-f0bd-48b3-abfb-49fcac8d03c4" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/dec18e63-d9ed-46cf-86f2-d343feb78599" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/23cd908b-99b2-4b57-8df3-0d0294a4304f" width="320" height="200"/> |

| Steel Blue | Arctic Cyan | Emerald Green |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/a236054c-3e47-4c12-bbd4-a11d371f3280" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/fb56fd90-7b55-4fd7-81f4-9d3a4d72b440" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/6d6f9619-80fb-4c4a-a75a-94d0c472b35b" width="320" height="200"/> |

| Amethyst Purple | Solar Yellow | Crimson Red |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/9decdabc-1f36-4a4d-ac34-80860b4b6020" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/2b8ba98d-a56d-4516-9cd6-a1a2af7cc68c" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/7b7f9b44-41a2-4544-bab2-6903d8dbd505" width="320" height="200"/> |

---
## Installation

<details>
<summary>HACS Installation</summary>

⚠️ **Warning:** Keep a backup of `config.js`. HACS updates will overwrite the file.

### Step 1: Add the Custom Repository in HACS
1. In your Home Assistant sidebar, click on HACS.
2. Click the three dots (menu icon) in the top-right corner and select Custom repositories.
3. In the window that pops up, fill out the following fields:
   - Repository: https://github.com/Big-Edge2297/homie-dashboard
   - Type: Select Dashboard.
4. Click Add.
5. Once added, find Homie Dashboard in your HACS list, click it, and click Download.

Result: This creates the folder structure on your system: config/www/community/homie-dashboard/. You can browse to this location later so you can edit the config.js file.

### Step 2: Register the Lovelace Resource
Home Assistant needs permission to access the JavaScript files inside your local folders.
1. Go to Settings -> Dashboards.
2. Click the three dots in the top-right corner and select Resources.
   (Note: If you don't see "Resources", go to your Profile page by clicking your username in the bottom-left corner, turn on Advanced Mode, and return to this step).
3. Click Add Resource (bottom right).
4. Enter the details exactly like this:
   - URL: /local/community/homie-dashboard/homie-dashboard.js
   - Resource Type: JavaScript Module
5. Click Create.

### Step 3: Refresh Your Frontend Cache
To ensure Home Assistant registers the newly added resource files, clear your browser cache:
   - Windows: Press Ctrl + F5
   - Mac:
     1. Enable Developer menu in Safari (Safari → Settings → Advanced → Show features for web developers)
     2. In the new "Develop" menu, select "Empty caches".

### Step 4: Create a Dashboard in the Sidebar
1. Go to Settings -> Dashboards.
2. Click Add Dashboard in the bottom-right corner.
3. Choose Webpage from the list.
4. Fill out the URL box and click next
   - URL: /local/community/homie-dashboard/homie-dashboard.html
5. Fill out the configuration box and click create
   - Title: Homie Dash
   - Icon: Choose an icon (e.g., mdi:tablet-dashboard)
  
Result: You will now see a Homie Dashboard tab in your left sidebar. Clicking it will load your user interface. It will show Connection Lost - Retrying at the top and entities will be empty. Your dashboard is now visible, but it needs permission to talk to your Home Assistant data.

### Step 5: Configure Your config.js File
5A. Generate an Access Token
1. Click your profile in the lower-left corner
2. Go to Security at the top of the page
3. Scroll to the bottom of the Profile page to Long-Lived Access Tokens
4. Click Create Token
5. Give it a name (e.g. Homie Dashboard) and click OK
6. Copy the token immediately — HA will never show it again
7. Keep it somewhere safe temporarily while you complete the setup

5B. Set Up the Configuration File
Navigate to your Home Assistant folder: config/www/community/homie-dashboard/
1. Look for a file named config.js.
2. Edit the config.js file (create a backup before making changes in case you mess up something).
3. Paste your Long-Lived Access Token into the token field and update the server URL configuration to match your Home Assistant IP address.
4. Follow the config.js file documentation to make changes to the entity names and save the file
5. DELETE THE FILE config.js.gz. This is something that HACS serves and it's causing issues, more info [here](https://www.hacs.xyz/docs/use/repositories/type/dashboard/#custom-features-for-files-stored-under-hacsfiles) 
6. Refresh your Homie Dashboard sidebar page, and it will connect directly to your Home Assistant entities!

Remember to clear the cache/hard refresh so the new file changes apply in the browser. On a tablet you will need to clear the Home Assistant companion app cache, in the app storage settings. Do not clear storage, only cache.

</details>

---

<details>
<summary>Standalone Installation (without HACS)</summary>
   
1. Copy homie-dashboard.html and config.js into your HA config/www/ folder
2. Access it in a browser at http://YOUR_HA_IP:8123/local/homie-dashboard.html or create a dashboard in HA like in Step 4 above and use /local/homie-dashboard.html
3. Follow step 5 to configure your config.js file

</details>

---

## Security

> [!WARNING]
> The HA Long-Lived Access Token is stored in plain text inside the config.js file. Anyone who can read the file has full access to your Home Assistant instance.

> DON'T BE like the guy in Massachusetts that has a room named Jason's room - if you have been on Reddit long enough, you will get the joke :)

**Recommendations:**
- Serve the file only on your local network — never expose it to the internet without authentication
- Create a dedicated HA user account for the dashboard token rather than using your personal admin account so you can limit access and exposure
- Revoke and regenerate the token periodically (HA → Profile → Long-Lived Access Tokens)
- For remote access, use a VPN (e.g. WireGuard)

---

## Release Highlights

<details>
<summary>View version history</summary>

New in v3.6.0
- Time of Day Theme - Apply different themes based on time of day
- Waze travel notification customizable for selected days/times
- Gestures settings for scroll from the top, scroll from the bottom and pinch to exit the dashboard back to the overview screen
- More stats in the Solar dashboard
   
New in v3.5.0
- Countdown Timers from Amazon Alexa integration or other HA integrations
- Camera Dashboard
- Solar Dashboard

New in v3.4.0
- Trends in AQI and weather stats

New in v3.3.0
- HA check functionality for smart light bulbs and switches and pass the appropriate entities in Lights
  
New in v3.2.0
- HACS Integration!

New in v3.1.0
- 10 Fonts in settings
- Swipe down from dashboards to return to the main screen

New in v3.0.0
- Settings Cog to customize settings directly from the dashboard
- New Overview screen with side controls
- Analog and Digital Clock Dashboards
- Weather Dashboard with adaptive weather conditions
- Mood Tracker in My Day
- Habit and Mood history for up to 30 days
- Volume Control in Music Players
- Themed Background based on theme selection
- Bloom Intensity for brighter/darker background
- Greeting and dashboard name personalization
- Weather popup in the main overview screens
- Language selection

New in v2.1.0
- Support for more than 2 Music Players
- Hide top right buttons
- Sensor row customization

New in v2.0.0
- Separate configuration file for much easier user adoption and setup
- Now Playing Dashboards - 2 beautiful full screen music dashboards
- My Day Dashboard - Calendar, Todo, Meals, Habits
- Memories Dashboard - Digital Photo Frame
- Thermostat Dashboard
  
New in v1.1.0
- Support for Spotify and Music Assistant
- Support for Media Browsing
- Alarmo controls
  
First Release v1.0.0
- 9 Themes
- Works both vertically and horizontally 
- Fullscreen on first tap
- No pinch-zoom, no text selection
- Very responsive and fast to update entity status
- Popups with many entities use a room accordion — tap a room to expand it, tap outside to dismiss
- Notifications/Reminders
- Music playback and controls
- Haptic Feedback on supported Android devices
  
</details>

More information for the Homie Dashboard Elements can be found [homie-dashboard-elements](https://github.com/Big-Edge2297/homie-dashboard/blob/main/docs/homie-dashboard-elements.md)
