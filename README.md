# **Homie Dashboard**

![Release](https://img.shields.io/github/v/release/Big-Edge2297/homie-dashboard?style=for-the-badge) ![Downloads](https://img.shields.io/github/downloads/Big-Edge2297/homie-dashboard/total?style=for-the-badge) ![Latest Release Downloads](https://img.shields.io/github/downloads/Big-Edge2297/homie-dashboard/latest/total?style=for-the-badge)

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Dashboard-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/) [![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://hacs.xyz/) [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<img src="https://github.com/user-attachments/assets/b9f66b35-5209-4fa8-bdc9-f92d6ed60517" width="400"/> <img src="https://github.com/user-attachments/assets/f17ef08f-a525-45c3-9d25-d641c6c273de" width="400"/>

Homie Dashboard is a touch-first Home Assistant dashboard designed for wall-mounted tablets.

It provides a customizable overview of your home while supporting dedicated dashboard modes for music, calendars, weather, photos, thermostats, cameras, clocks, alarm, solar monitoring and more.

Designed for:
✅ Wall-mounted tablets
✅ Dedicated Home Assistant displays
✅ Touch-first interfaces

Not designed for:
❌ Phones
❌ Desktop browsers as primary usage
❌ Small screens

[Screenshots](#screenshots) · [Installation](#installation) · [Setup wizard](#setup-wizard) · [Upgrading from v4](#upgrading-from-v4x) · [Security](#security) · [Changelog](CHANGELOG.md)

> [!IMPORTANT]
> **v5.0.0 is a major change.** Homie is now a proper Home Assistant integration installed through HACS. There is no `config.js` and **no access token to paste anywhere**. If you are on v4.x, read [Upgrading from v4.x](#upgrading-from-v4x) first. Your settings can be imported in one click.

## What's new in v5

- 🔐 **No token in a file.** Homie signs in with your logged-in Home Assistant session.
- 🧙 **Setup wizard.** Pick your lights, scenes, climate, cameras, weather, alarm, music players and calendars from your own Home Assistant. No code editing.
- 💾 **Updates never overwrite your setup.** Your choices live inside Home Assistant, not in the downloaded files.
- 📥 **One-click import** of your v4 `config.js`.
- 🖼️ **Photos are detected automatically.** Drop images in a folder, no filename lists.

## Quick Start

1. **Install** Homie Dashboard with HACS (see [Installation](#installation) for all options) and **restart Home Assistant**.
2. **Settings → Devices & services → Add integration → Homie Dashboard**.
3. Open **Homie** in the sidebar. The setup wizard starts automatically.

> [!NOTE]
> **HACS default catalog: pending approval.** Until Homie Dashboard is approved, install it as a custom repository (Option B) or manually (Option C). Once approved, you will be able to simply search for it in HACS (Option A).

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

| Solar Dashboard | Camera Dashboard | Indoor AQI |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/4e24b1e0-3364-460c-af53-bfcff242d699" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/fc70c54a-a8d6-4953-b335-4c58d4939c06" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/7bc8253b-ceab-46b1-8645-9ce782274f2c" width="320" height="200"/> | 

| Indoor Presence | Insights | Settings |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/fecb3b91-0b36-44eb-9c0c-f253bc0f14e7" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/6a86421a-eb1a-4c02-a142-f51753c8520f" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/ed7dff49-2333-4874-86bd-3be9afe26a11" width="320" height="200"/> | 


### Entities and other screens

| Pet Stats | Alarm | Lights |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/5622becd-5831-4316-9119-e0cb64b31a8f" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/94e1de82-dc86-4f2c-823b-033814d190f3" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/89d52cd2-bf4a-4153-8976-c82599caa683" width="320" height="200"/> |


| Scenes | AirCon | Blinds |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/e7f3b548-7c1d-434d-b05b-0dd217de039e" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/2e7e9043-120e-4ed1-9fa3-8dadd75654a9" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/b6f6191c-42a0-4dcf-9d75-c17f05e09222" width="320" height="200"/> |


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

**Requirements:** Home Assistant 2025.1 or newer. The tablet (or any device) must be signed in to Home Assistant, which is normal for the Companion app or a browser you have logged in.

Choose **one** of the options below, then continue with [Add the integration](#add-the-integration).

<details open>
<summary><b>Option A: HACS (recommended)</b>: pending approval in the HACS default catalog</summary>

> [!NOTE]
> Homie Dashboard has been submitted to the HACS default catalog and is **pending approval**. This option will work once it is approved. Until then, use Option B or C.

1. Open **HACS** in the Home Assistant sidebar.
2. Search for **Homie Dashboard**.
3. Open it and click **Download**.
4. **Restart Home Assistant** (Settings → System → ⋮ → Restart Home Assistant).

</details>

<details>
<summary><b>Option B: HACS custom repository</b>: available now</summary>

1. Open **HACS** in the Home Assistant sidebar.
2. Click the three dots (top right) → **Custom repositories**.
3. Repository: `https://github.com/Big-Edge2297/homie-dashboard`, Type: **Integration**. Click **Add**.
4. Find **Homie Dashboard** in the list, open it, and click **Download**.
5. **Restart Home Assistant**.

Once Homie is in the default catalog you can keep using this install. Updates continue to arrive through HACS.

</details>

<details>
<summary><b>Option C: Manual installation</b></summary>

1. Download the latest release from the [Releases page](https://github.com/Big-Edge2297/homie-dashboard/releases) (or use **Code → Download ZIP**).
2. Copy the folder `custom_components/homie_dashboard` from the download into your Home Assistant `config/custom_components/` folder. You should end up with `config/custom_components/homie_dashboard/manifest.json`.
3. **Restart Home Assistant**.

To update later, repeat the steps and overwrite the folder. Your setup is stored separately inside Home Assistant, so it is kept.

</details>

### Add the integration
1. Settings → Devices & services → **Add integration**.
2. Search for **Homie Dashboard**.
3. Choose the sidebar title and icon (you can change these later from the integration's **Configure** button) and submit.
4. A new item appears in the sidebar. Open it and the [setup wizard](#setup-wizard) walks you through the rest. You do **not** need to create a dashboard yourself.
5. If a wall tablet was already open, reload the page. In the Companion app clear the app **cache** (not storage), or just restart the app.

---
## Setup wizard

The wizard opens automatically the first time, and any time later from **Settings → About → Open setup** inside the dashboard.

| Step | What you choose |
|---|---|
| Welcome | Import your v4 `config.js` (optional) |
| Lights | Which lights to show, grouped by your Home Assistant **areas** |
| Scenes | Your scenes (icons and colours picked from the name) |
| Climate & more | Air con, purifiers, blinds, switches |
| Cameras | Up to 6 cameras, motion sensors (suggested automatically) and a doorbell |
| Home | Weather, sunrise/sunset, moon, alarm panel and code, music players, calendars |
| Advanced | Edit every other option as JSON (solar, garden, indoor air quality, presence, pet stats, home stats…) |
| Review & save | Check and save |

You need a Home Assistant **administrator** account to change the setup. Other users (for example a dedicated tablet user) can view and use the dashboard.

### Photos and backgrounds
Copy images (`jpg`, `jpeg`, `png`, `webp`, `gif`) to these folders on your Home Assistant server. They are detected automatically; reload the dashboard after adding files.

| Folder | Used for |
|---|---|
| `/config/homie_dashboard/photos/` | Photo frame (Memories) |
| `/config/homie_dashboard/photos/background/` | Overview background pictures (Settings → Background) |

The folders are created for you when the integration starts.

---
## Upgrading from v4.x

Your v4 settings can be imported, but **HACS deletes the old files when you remove the old entry**, so do these steps in order:

1. **Keep a copy of `config.js`.** Download or copy `config/www/community/homie-dashboard/config.js` (or wherever yours is).
2. In **HACS**, remove the old *Homie Dashboard* entry (it was added with type *Dashboard*).
3. Install the new version using any option in [Installation](#installation) (for example the custom repository with type **Integration**), then restart Home Assistant.
4. Add the **Homie Dashboard** integration. In the wizard's first step choose **Choose config.js…** and select your saved file. (If the old file is still in `www`, the wizard finds it and offers a one-click **Import it**.)
5. Check each step, then **Save & open dashboard**.
6. **Clean up:**
   - Delete the old *Webpage* dashboard (Settings → Dashboards) that pointed to `/local/…homie-dashboard.html`.
   - Delete the old resource `/local/community/homie-dashboard/homie-dashboard.js` (Dashboards → ⋮ → Resources).
   - Delete any leftover `config.js` copies.
   - **Revoke the old Long-Lived Access Token** (Profile → Security → Long-Lived Access Tokens). It is no longer needed.

The token inside your old `config.js` is **never** read or stored by the importer. Your dashboard preferences (theme, fonts, gestures…) stay on each device and carry over automatically.

Prefer to stay on the old version? It remains available as release [v4.3.0](https://github.com/Big-Edge2297/homie-dashboard/releases/tag/v4.3.0) and on the `legacy-4.x` branch.

---
## Security

- **No access token is stored anywhere.** Homie uses the short-lived session token of the Home Assistant user that is signed in, refreshed automatically.
- Your selections are stored in Home Assistant's private `.storage` folder, not in a file served over the web. The **alarm code** (if you set one) is stored there too.
- The dashboard is only reachable by signed-in Home Assistant users. You can restrict it to administrators in the integration's **Configure** options.
- Photos in `/config/homie_dashboard/photos/` are served without authentication (the same way Home Assistant serves its `www` folder), so don't put anything sensitive there.
- For remote access use a VPN (e.g. WireGuard) or Home Assistant Cloud. Never expose Home Assistant to the internet without proper protection.

---
## Troubleshooting

| Problem | Fix |
|---|---|
| "Open Homie Dashboard from Home Assistant" | Open **Homie** from the HA sidebar instead of a direct address. |
| Wizard says setup needs an administrator | Sign in with an admin account to change the setup. |
| Entities missing in the wizard | Entities hidden or marked as config/diagnostic in HA are not listed. Unhide them in HA, or add them in the Advanced step. |
| Old settings didn't import | Make sure you chose your v4 `config.js` (not the HTML file). |
| Blank page after updating | Reload; on the Companion app clear the cache (Settings → Companion app → Troubleshooting). |
| "Home Assistant session expired" | Reload the page. If it repeats, sign out and back in on that device. |

More information for the Homie Dashboard elements can be found in [homie-dashboard-elements](https://github.com/Big-Edge2297/homie-dashboard/blob/main/docs/homie-dashboard-elements.md).

---
## Contributing & license

Issues and pull requests are welcome. Released under the [MIT License](LICENSE).
