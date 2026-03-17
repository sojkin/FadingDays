# ⏳ Fading Days

**Fading Days** is a minimalist browser extension for **Chrome** and **Firefox** that makes you aware of the passage of time by counting down to key moments in your life — retirement, milestones, or any date that matters to you.

It calculates not just the remaining days, but also the number of **weekends**, **Christmas Eves**, **Easter Sundays**, **summer vacations**, **public holidays**, **working days**, and **days off** left until your target date.

---

## ✨ Features

- **Multiple countdown targets** — Set a primary goal (e.g., retirement) and additional targets (e.g., mortgage payoff, 40th birthday). Switch between them with navigation arrows.
- **Rich metrics** — For each target, see:
  - **Total remaining days** — calendar days from today to the target date
  - **Weekends** — full Saturday + Sunday pairs remaining
  - **Christmas Eves** — how many December 24ths fall between now and the target
  - **Easters** — Easter Sundays remaining, computed via the Gauss algorithm
  - **Vacations** — how many July 1sts (start of summer) fall in the range
  - **Public holidays** — all official public holidays for your country (including those on weekends), fetched from [Nager.Date API](https://date.nager.at/)
  - **Working days** — weekdays minus public holidays that fall on weekdays (Mon–Fri)
  - **Days off** — all non-working days: Saturdays, Sundays, and public holidays that fall on weekdays
- **Public holidays via Nager.Date API** — The extension uses the free [Nager.Date API](https://date.nager.at/) to fetch public holidays for your country. Holiday data is cached locally for 30 days to minimize network requests. Your country is auto-detected from the browser locale, but can be changed manually in settings. Over 100 countries are supported.
- **Life progress bar** — Enter your date of birth and statistical life expectancy to see a fading progress bar showing how much of your life has statistically already passed.
- **Cloud sync** — All settings are stored via `chrome.storage.sync`, so your data follows you across devices logged into the same browser account.
- **Multi-language support** — Available in 7 languages:
  - 🇬🇧 English
  - 🇵🇱 Polski (Polish)
  - 🇩🇪 Deutsch (German)
  - 🇪🇸 Español (Spanish)
  - 🇫🇷 Français (French)
  - 🇰🇷 한국어 (Korean)
  - 🇨🇳 中文 (Chinese)

  Language can be changed at any time in the extension's settings page. The extension name and description are also translated natively via Chrome's `_locales` system for better discoverability in Chrome Web Store.
- **Configurable metrics** — Choose which countdowns to display in the popup. Toggle weekends, Christmas Eves, Easters, vacations, public holidays, working days, and days off on or off independently.
- **Custom metrics order** — Drag and drop metrics in the settings page to reorder how they appear in the popup.
- **Default target** — Set any target as the default one shown when the popup opens, not just the first in the list.
- **Two target modes** — Define each target by a specific **date** or by **age** (e.g., retirement at 65). In age mode, the target date is automatically calculated from your date of birth.
- **Dark, minimal design** — A somber, thoughtful aesthetic with a deep dark background, muted copper accent color, monospace number fonts, and smooth fade-in animations.

---

## 📸 UI Overview

### Popup (main window)
When you click the extension icon, you see:
1. **Header** — Current target name with navigation arrows (if multiple targets exist).
2. **Main counter** — Large, prominent number of remaining days in accent color.
3. **Life progress bar** — Subtle fading bar (visible only if birth date and life expectancy are set).
4. **Metrics grid** — Dynamic grid showing only the enabled metrics (weekends, Christmas Eves, Easters, vacations).
5. **Settings button** — Gear icon in the footer leading to the options page.

### Options page
A full-page settings interface where you can:
- Select your preferred **language** (7 languages available).
- Enter your **date of birth** (optional, used for age-based targets and the life progress bar).
- Set your **statistical life expectancy** (optional, enables the life progress bar).
- Toggle **visible metrics** — choose which countdowns (weekends, Christmas Eves, Easters, vacations, public holidays, working days, days off) appear in the popup. Drag and drop to reorder.
- Select your **country** — auto-detected from the browser or set manually. Used to fetch public holidays from the Nager.Date API.
- Manage **target dates** — add, edit, rename, or delete countdown targets. Each target can use **date mode** (specific date) or **age mode** (target age, calculated from birth date).
- **Set any target as default** — the default target is shown when the popup opens.
- Links to **GitHub** repository and **Buy Me a Coffee** in the footer.

---

## 🛠️ Technical Details

| Property        | Value                          |
|-----------------|--------------------------------|
| Platform        | Chromium (Chrome, Edge, Opera, Brave, Vivaldi) + Firefox 109+ |
| Manifest        | V3                             |
| Permissions     | `storage`, host access to `date.nager.at` |
| Storage         | `chrome.storage.sync`          |
| Build tools     | None required (vanilla JS), optional `build.sh` for packaging |
| External deps   | Google Fonts (Inter, JetBrains Mono) via CSS, [Nager.Date API](https://date.nager.at/) for public holidays |

### Project Structure

```
FadingDays/
├── manifest.json              # Extension manifest (MV3, Chrome + Firefox)
├── build.sh                   # Build script for distribution packages
├── README.md                  # This file
├── _locales/                  # Browser native i18n (Store name/description)
│   ├── en/messages.json
│   ├── pl/messages.json
│   ├── de/messages.json
│   ├── es/messages.json
│   ├── fr/messages.json
│   ├── ko/messages.json
│   └── zh/messages.json
├── assets/
│   └── icons/                 # Extension icons (16, 32, 48, 128 px)
│       ├── icon16.png
│       ├── icon32.png
│       ├── icon48.png
│       └── icon128.png
└── src/
    ├── core/                  # Shared modules
    │   ├── calculations.js    # Countdown engine (days, weekends, holidays, working days)
    │   ├── holidays.js        # Nager.Date API client with local caching
    │   ├── i18n.js            # UI internationalization (7 languages)
    │   └── storage.js         # chrome.storage.sync wrapper
    ├── popup/                 # Popup UI (shown on icon click)
    │   ├── popup.html
    │   ├── popup.css
    │   └── popup.js
    └── options/               # Full-page settings
        ├── options.html
        ├── options.css
        └── options.js
```

### Key Algorithms

- **Easter date calculation** — Uses the [Gauss Easter algorithm](https://en.wikipedia.org/wiki/Date_of_Easter#Anonymous_Gregorian_algorithm) to compute the movable date of Easter Sunday for any given year.
- **Weekend counting** — Iterates from the current date, advancing to the nearest Saturday, then counts complete Saturday–Sunday pairs until the target date.
- **Christmas Eve / Vacation counting** — Simple year-by-year iteration checking if December 24 or July 1 falls within the remaining date range.
- **Public holidays** — Fetched per year from the [Nager.Date API](https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}) and cached in `chrome.storage.local` for 30 days. Only years within the date range are fetched, and requests are parallelized. Country is auto-detected from `navigator.language` or set manually.
- **Working days / Days off** — Computed by iterating day-by-day through the range, classifying each as weekend, weekday holiday, or working day.

---

## 🏪 Download from Official Stores

Install Fading Days directly from your browser's official extension store:

- **🦊 Firefox Add-ons**: https://addons.mozilla.org/pl/firefox/addon/fading-days-life-countdown/
- **🔵 Chrome Web Store**: https://chromewebstore.google.com/detail/fading-days-–-odliczanie/cklkhngecjnkbcemnlfhcmapfcnlbdnb

---

## 🚀 Installation (Developer Mode)

### Chrome / Chromium
1. **Clone or download** this repository.
2. Open your Chromium browser and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **"Load unpacked"** and select the `FadingDays/` project folder.
5. The extension icon will appear in your toolbar.

### Firefox
1. **Clone or download** this repository.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click **"Load Temporary Add-on…"** and select the `manifest.json` file inside the `FadingDays/` folder.
4. The extension icon will appear in your toolbar.

> **Note:** Temporary add-ons are removed when Firefox is closed. To install permanently, package the extension (`./build.sh`) and submit it to [Firefox Add-ons (AMO)](https://addons.mozilla.org/).

### Building distribution packages

```bash
./build.sh
```

This creates `dist/FadingDays-v{version}-chrome.zip` and `dist/FadingDays-v{version}-firefox.zip` ready for upload to Chrome Web Store and Firefox Add-ons.

---

## 🌍 Adding a New Language

To add support for another language:

1. Open `src/core/i18n.js`.
2. Add a new translation object to the `translations` map (e.g., `fr: { ... }`).
3. Add the language to the `SUPPORTED_LANGUAGES` array.
4. That's it — the language will automatically appear in the settings dropdown.

---

## ☕ Support

If you find this extension useful, you can support its development:

<a href="https://buymeacoffee.com/4dpbvzmph0" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40"></a>

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute it.

---

> *"The days are long, but the decades are short."* — Sam Altman
