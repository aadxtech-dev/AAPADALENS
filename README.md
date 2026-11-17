# AapadaLens

AapadaLens is being developed as an Odisha-first cyclone preparedness and shelter-management application.

## Current working version

The app runs in a browser and supports English, Odia, and Hindi. It currently provides:

- Add, edit, search, filter, and delete shelter records.
- Required source details for each shelter record; new and edited records are marked **Needs review** and are not independently verified by the app.
- Optional coordinates that are opened in OpenStreetMap only after a user clicks the map link.
- Household readiness, emergency-kit, and family-plan checklists.
- Capacity calculations based on locally entered shelter capacity and a demand entered by the user.
- CSV export for shelter records.
- Local dark/light theme and language settings.
- An explicit empty state for official alerts until an official source is integrated.

There are no preloaded shelter records, locations, capacities, or active warnings. Add only information you have permission to record and include its source.

## Phase 1 features

- Nearby shelters (distance sort; location used in-browser only, never saved or sent).
- Manually entered shelter occupancy and available spaces.
- Hazard guides (cyclone, flood, heatwave, lightning) with checklists and text-to-speech.
- Shelter readiness score and resource-gap view (recorded facilities only, not an inspection).
- Planner comparison bars.
- Hindi and Odia hazard text needs native-speaker review before the pilot.

## Phase 2 features (live data and AI)

- Official alerts centre: Odisha items from the NDMA Sachet CAP feed, fetched by the local server (`api.js`).
- Weather: Open-Meteo model forecast (not an IMD warning), proxied by the server.
- Map: Leaflet (bundled in `vendor/`) with OpenStreetMap tiles and your shelter records. Official hazard-zone layers are NOT connected.
- AI features (assistant with voice input and read-aloud, alert summary, Odia/English/Hindi translation, shelter comparison note, planning note, report classification) use Groq when `GROQ_API_KEY` is set. `GROQ_MODEL` defaults to `openai/gpt-oss-120b`. If Groq encounters a quota, network, timeout or server error, the request is sent once to Gemini when `GEMINI_API_KEY` is also set. Gemini uses the official Node.js SDK Interactions API with `store:false`, disabled retries and `GEMINI_MODEL` defaulting to `gemini-3.8-flash`. Keys stay on the server. If only Gemini is configured, it remains usable directly; without either key AI buttons are disabled, and report triage falls back to simple keyword rules.
- Both providers require internet access; free-tier availability and limits are controlled by each provider and paid accounts can incur costs. Verify the plan and billing settings of both accounts yourself. Fallback sends the same prompt to a second provider; avoid sensitive data and review both providers' retention policies.
- AI output is labelled and is never presented as official.
- Hindi and Odia text needs native-speaker review.

## Phase 3 features (local, no backend)

- Safety and planning: contacts directory, consent-based location message, evacuation plan, medical card, meeting points, accessibility checks, family members, before/during/after hazard guides, keyword smart search (not AI).
- Shelter management: stock, first aid, power, sanitation, maintenance, distribution, comparison, data-quality and stale-data checks.
- Planner and analytics: local preparedness plan and scenarios (AI reword needs a key), district overview, readiness scorecards, trends, snapshots.
- Reports: printable report, CSV export, JSON backup/restore, situation-summary draft.
- Community: campaigns, local info, resource directory, announcements, volunteers and tasks, report photos, duplicate hint, review status.
- Help centre, FAQ, privacy draft, tour, feedback (saved on device only), local summary.
- Settings: text size, high contrast, low-data mode, alert notifications (opt-in), shortcuts, permissions, install.
- PWA: `manifest.webmanifest` and `sw.js` give an offline copy and installability on localhost/https.
- After the app shell is cached, local records and guides remain available offline. Previously fetched alerts or weather may be served from the browser cache and are labelled as offline copies with their last-fetch time; they are not current warnings. AI and new live data require internet, and maps only show previously cached tiles.
- Startup shows the bundled weather animation, followed by the AapadaLens logo. It runs once per app load, not on in-app navigation; reduced-motion and low-data users see the logo without the animation. After the app has been cached, startup assets are available offline. Playback falls back to the logo if the animation cannot load.
- Settings includes an original instrumental theme with play/pause controls. It does not autoplay and is included in the offline app shell after caching.

Not built (needs backend, login, AI key, real data or hardware): multi-user sync, accounts and roles, audit logs, official risk layers, satellite/IoT, route optimisation, prediction models, intro video. Hindi and Odia text needs native-speaker review. Legal text is a draft.

## Backend (local server, Phase 4)

`backend.js` adds accounts (scrypt passwords, HttpOnly session cookie, login lockout), roles (citizen, volunteer, admin), shared shelter records, an incident review queue and an audit log, stored in `data/aapadalens.db` (Node's built-in SQLite). The first account created becomes admin. Use the "Account & sync" page. This runs only on the machine that starts `node server.js`; real multi-device use needs hosting (HTTPS, host allow-list change, backups) and a data-protection review. Passwords reset, email/phone verification and shared photos are not built.

## Toolkit modules (shelter finder, cyclone tracker, safety toolkit)

Added in `modules.js`, `mod-shelters.js`, `mod-cyclone.js`, `mod-safety.js` and `modules.css` (sidebar group “TOOLKIT”). They sit alongside the older pages and change none of them.

- **Shelter finder:** lists your saved shelters plus clearly marked SAMPLE shelters (toggle off in the page), with status, capacity, facilities, search, filters, sort, a map and details. Location is requested only after consent. No routing service is connected, so only straight-line distance is shown; walking/driving buttons open OpenStreetMap directions. “Save for offline” stores a snapshot and a few map tiles of the current view.
- **Cyclone tracker:** storm tracks, forecast positions, archive and district warnings are SAMPLE data. Official alerts come from the NDMA Sachet feed; wind/rain layers use Open-Meteo model data (not IMD). The uncertainty cone is not shown until official data is integrated.
- **Safety toolkit:** emergency numbers (national numbers; confirm locally), personal contacts, an evacuation checklist saved on the device, and English/Odia guides with a text download. Odia text needs native-speaker review.
- No SOS, SMS, live GPS tracking or routing is claimed or implemented.

## Gemini AI Assistant setup

1. Get a key from https://aistudio.google.com/apikey.
2. Set `GROQ_API_KEY` and/or `GEMINI_API_KEY` in `.env` (optional `GROQ_MODEL` and `GEMINI_MODEL` settings as above). Never put keys in frontend code or share them in chat. `.env` is never served to the browser (the server returns 403 for dotfiles) and is excluded from Git.
3. Use Node.js 22 or newer and run `npm install`, then `npm start`. Open http://127.0.0.1:8000 and use the AI Assistant page.
4. Chat history is saved in the browser (last 40 messages) and can be cleared with "Clear chat". Check `/api/status` for `{"ai":true}`.

## Run locally

Install Node.js 18 or newer, then run this from the project folder:

```powershell
node server.js
```

Then open `http://127.0.0.1:8000` in a browser. Stop the local server with `Ctrl+C`.

The app's AI features require the setup above. The server listens on this computer only.

## Open on a phone over Wi-Fi

1. Connect the phone and computer to the same trusted private Wi-Fi network.
2. Stop any running app server, then run `npm run start:phone` from the project folder.
3. Open the `http://...` address printed by the server in the phone's browser.
4. Stop phone mode with `Ctrl+C` when finished.

Phone mode accepts requests only from the computer's local network and checks API request origins. On plain HTTP, browsers may omit origin information for GET requests, so those reads are allowed from the local network; use only trusted private Wi-Fi and do not enter sensitive information or passwords. AI API usage is still subject to the configured provider account and rate limits. Phone browsers may restrict GPS, PWA installation/service workers, and some offline features unless served over HTTPS. The app remains usable for ordinary browsing and local testing.

## Hosting online (phone without a laptop)

Set `PUBLIC_HOSTS` to your deployed domain (comma-separated if several) and start with `npm start`. The server then listens on `PORT` for all interfaces, accepts only requests for those hostnames and same-origin API calls. Put it behind HTTPS (most hosts do this automatically), and set `GROQ_API_KEY`/`GEMINI_API_KEY` as the host's secret environment variables, never in files you upload. The app needs Node.js 22+. The first account created in "Account & sync" becomes admin, so create yours before sharing the link; free hosts may erase `data/` on restart.

## Data and safety limitations

- Shelter records, checklist ticks, and preferences are stored in this browser on this device. They do **not** sync to staff, volunteers, or other devices and are not backed up.
- Browser storage is not a secure multi-user database. Do not store confidential personal information or assume records are protected by staff permissions.
- Shelter information is marked **Needs review**. Entering a source does not mean the information has been independently verified.
- No government shelter directory, official warning feed, live weather service, or AI service is connected. The app does not show current alerts or make calls/send SOS.
- The capacity planner is a calculation from entered values, not live occupancy, a forecast, or an evacuation plan.
- OpenStreetMap is an external service. A shelter's entered coordinates are sent to it only when its map link is opened.

## Rollout

1. **Phase 1:** Odisha pilot launch.
2. **Phase 2:** Test in selected Odisha districts and shelters.
3. **Phase 3:** Expand to other Indian states only after feedback and verification.

This version does not claim an India-wide launch. Before a multi-user pilot, the app needs a shared database, authenticated roles, a review workflow, backups, and district-level testing. Official alerts should be added only through a verified, authorized source.
