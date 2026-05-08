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

## Screenshots

| Overview Dashboard | Notifications and Music | Dashboard Modes |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/444fb202-fa95-468e-9d90-9f8fdd9dee5f" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/7087e6e2-2980-40b6-829c-71e143dcdb6f" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/0adb38f3-c0f9-47d2-a464-75b6cd8a6553" width="320" height="200"/> |

| Now Playing Dashboard A | Now Playing Dashboard B | My Day Dashboard |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/0035aa33-3489-41c6-bcda-55923ec36b1a" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/ed0d9782-77c6-491d-9854-4c3ee4171fc5" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/ed10dc98-2453-4029-9d63-749443c8638a" width="320" height="200"/> |

| Memories Dashboard | Thermostat Dashboard | Themes |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/04555ed4-983d-47ac-b672-8568867c6bf9" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/b0a94058-a174-4fe4-92b9-dc387a5ce4ea" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/39d826bb-2a85-4dec-adf9-9a5ddbce3244" width="320" height="200"/> |

| Pet Stats | Alarm Status | Lights |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/c3d8fb36-c271-43e3-aaae-064a454a47d1" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/0ec20e9d-604d-42d6-af8c-a3e9a942bc81" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/89d52cd2-bf4a-4153-8976-c82599caa683" width="320" height="200"/> |

| Scenes | AirCon | Blinds |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/e7f3b548-7c1d-434d-b05b-0dd217de039e" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/2e7e9043-120e-4ed1-9fa3-8dadd75654a9" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/b6f6191c-42a0-4dcf-9d75-c17f05e09222" width="320" height="200"/> |

| ... and Shumi 🐱 |
|--------|
| <img src="https://github.com/user-attachments/assets/2b4c66f6-2b31-4a11-b967-55e7fc3f4b0a" width="320" height="557"/> |<img width="2560" height="1600" alt="15  Blinds" src="https://github.com/user-attachments/assets/707451a4-abb4-49a6-9100-9ca64ee771a7" />


## Theme Screenshots

| Classic Gold | Deep Copper | Terracotta |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/a59a180f-852f-4ffc-b53f-505e8c1a8d59" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/3608d390-d8e7-4ed7-a30b-7e8003a96ee8" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/4b948a3c-1c01-4ad2-931f-9252be1415eb" width="320" height="200"/> |

| Steel Blue | Arctic Cyan | Emerald Green |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/cbd4106d-d00e-40d7-aec0-70b43ab9190e" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/00b0a8e1-761b-4f19-bebd-d9ffc4affba3" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/7ec8622d-1ef5-4764-b7ff-cc1fbe650100" width="320" height="200"/> |

| Amethyst Purple | Solar Yellow | Crimson Red |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/44f850b2-cbc6-49a0-8aaf-2fad3b5981e1" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/901445d8-58f8-43b6-8a4b-61c833363b06" width="320" height="200"/> | <img src="https://github.com/user-attachments/assets/df6f6316-7f9e-4543-881b-ffb2c95b7a07" width="320" height="200"/> |


---

## Features
New in v2.0.0
- Separate configuration file for much easier user adoption and setup
- Now Playing Dashboards - 2 beautiful full screen music dashboards
- My Day Dashboard - Calendar, Todo, Meals, Habits
- Memories Dashboard - Digital Photo Frame
- Thermostat Dashboard
  
New in v1.1.0
- Support for Spotify and Music Assistant - new in v1.1.0
- Support for Media Browsing - new in v1.1.0
- Alarmo controls - new in v1.1.0
  
First Release
- 9 Themes
- Works both vertically and horizontally 
- Fullscreen on first tap
- No pinch-zoom, no text selection
- Very responsive and fast to update entity status
- Popups with many entities use a room accordion — tap a room to expand it, tap outside to dismiss
- Notifications/Reminders
- Music playback and controls
- Haptic Feedback on suported Android devices

More information for the Homie Dashboard Elements can be found [homie-dashboard-elements](https://github.com/Big-Edge2297/homie-dashboard/blob/main/homie-dashboard-elements.md)

---

## Setup
Follow the [homie-dashboard-setup-guide](https://github.com/Big-Edge2297/homie-dashboard/blob/main/homie-dashboard-setup-guide.md) for a step by step guide on how to setup the dashboard.
