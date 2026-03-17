# Privacy Policy — Fading Days

**Last updated:** March 17, 2026

## Overview

Fading Days is a browser extension that counts down remaining days, weekends, holidays, and other metrics to user-defined target dates. Your privacy is important — the extension is designed to work with minimal data and no tracking.

## Data Collection

Fading Days does **not** collect, store, or transmit any personal data to external servers. Specifically:

- **No analytics or tracking** — No usage data, telemetry, or crash reports are sent anywhere.
- **No user accounts** — No sign-up, login, or authentication is required.
- **No cookies** — The extension does not set or read any cookies.
- **No advertising** — There are no ads and no ad-related data collection.

## Data Storage

All user preferences (target dates, date of birth, life expectancy, language, country, metric settings) are stored **locally in your browser** using `chrome.storage.sync`. This data is synced across your devices by your browser's built-in sync mechanism (e.g., Chrome Sync or Firefox Sync) — **not** by the extension developer.

Public holiday data fetched from the Nager.Date API is cached locally in `chrome.storage.local` for up to 30 days to reduce network requests. This cache contains only public holiday dates and country names — no user data.

## External Services

The extension makes requests to a single external service:

- **Nager.Date API** (`https://date.nager.at`) — Used to fetch public holiday data for the user's selected country. These requests are anonymous GET requests with no cookies, tokens, or user-identifying information. The API is free and open source ([GitHub](https://github.com/nager/Nager.Date)).

No other external connections are made.

## Permissions

| Permission | Purpose |
|------------|---------|
| `storage` | Save user preferences locally and sync across devices |
| `host_permissions` (date.nager.at) | Fetch public holiday data |

## Data Sharing

No data is shared with third parties. Ever.

## Changes to This Policy

If this policy changes, the updated version will be published in this repository with a new "Last updated" date.

## Contact

For questions about this privacy policy, open an issue at [github.com/sojkin/FadingDays](https://github.com/sojkin/FadingDays).
