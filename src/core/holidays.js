/**
 * Fading Days – Public Holidays module
 * Fetches and caches public holidays from Nager.Date API.
 */

const API_BASE = 'https://date.nager.at/api/v3';
const CACHE_TTL_HOLIDAYS = 30 * 24 * 60 * 60 * 1000; // 30 days
const CACHE_TTL_COUNTRIES = 7 * 24 * 60 * 60 * 1000;  // 7 days

/**
 * Detect country code from browser locale.
 * @returns {string} Two-letter country code (e.g. "PL", "DE", "US")
 */
export function getCountryFromLocale() {
    const lang = navigator.language || navigator.userLanguage || 'en-US';
    // Try region subtag first: "pl-PL" → "PL", "en-GB" → "GB"
    const parts = lang.split('-');
    if (parts.length >= 2) {
        const region = parts[parts.length - 1].toUpperCase();
        if (region.length === 2) return region;
    }
    // Fallback: map language code to most common country
    const langToCountry = {
        pl: 'PL', de: 'DE', fr: 'FR', es: 'ES', ko: 'KR', zh: 'CN',
        en: 'US', it: 'IT', pt: 'BR', ja: 'JP', nl: 'NL', sv: 'SE',
        cs: 'CZ', da: 'DK', fi: 'FI', no: 'NO', hu: 'HU', ro: 'RO',
    };
    return langToCountry[parts[0].toLowerCase()] || 'US';
}

/**
 * Get cached data from chrome.storage.local.
 * @param {string} key
 * @param {number} ttl - Max age in ms
 * @returns {Promise<any|null>}
 */
async function getCache(key, ttl) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
                resolve(null);
                return;
            }
            const entry = result[key];
            if (entry && entry.timestamp && (Date.now() - entry.timestamp < ttl)) {
                resolve(entry.data);
            } else {
                resolve(null);
            }
        });
    });
}

/**
 * Set cached data in chrome.storage.local.
 * @param {string} key
 * @param {any} data
 * @returns {Promise<void>}
 */
async function setCache(key, data) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: { data, timestamp: Date.now() } }, () => {
            if (chrome.runtime.lastError) { /* ignore quota errors */ }
            resolve();
        });
    });
}

/**
 * Fetch public holidays for a specific country and year.
 * Returns cached data if available.
 * @param {string} countryCode
 * @param {number} year
 * @returns {Promise<string[]>} Array of date strings "YYYY-MM-DD"
 */
export async function fetchHolidaysForYear(countryCode, year) {
    const cacheKey = `holidays_${countryCode}_${year}`;
    const cached = await getCache(cacheKey, CACHE_TTL_HOLIDAYS);
    if (cached) return cached;

    try {
        const resp = await fetch(`${API_BASE}/PublicHolidays/${year}/${countryCode}`);
        if (!resp.ok) return [];
        const holidays = await resp.json();
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const dates = holidays
            .filter(h => h.types && h.types.includes('Public') && typeof h.date === 'string' && dateRegex.test(h.date))
            .map(h => h.date);
        await setCache(cacheKey, dates);
        return dates;
    } catch {
        return [];
    }
}

/**
 * Get all public holiday dates between two dates as a Set.
 * Fetches/caches per year, only fetching years not yet cached.
 * @param {string} countryCode
 * @param {Date} from
 * @param {Date} to
 * @returns {Promise<Set<string>>} Set of "YYYY-MM-DD" strings
 */
export async function getHolidaysForRange(countryCode, from, to) {
    const startYear = from.getFullYear();
    const endYear = to.getFullYear();
    const allDates = new Set();

    const fetches = [];
    for (let y = startYear; y <= endYear; y++) {
        fetches.push(fetchHolidaysForYear(countryCode, y));
    }

    const results = await Promise.all(fetches);
    for (const dates of results) {
        for (const d of dates) {
            allDates.add(d);
        }
    }

    return allDates;
}

/**
 * Fetch available countries from the API (cached 7 days).
 * @returns {Promise<Array<{countryCode: string, name: string}>>}
 */
export async function fetchAvailableCountries() {
    const cacheKey = 'nager_available_countries';
    const cached = await getCache(cacheKey, CACHE_TTL_COUNTRIES);
    if (cached) return cached;

    try {
        const resp = await fetch(`${API_BASE}/AvailableCountries`);
        if (!resp.ok) return [];
        const countries = await resp.json();
        if (!Array.isArray(countries)) return [];
        const valid = countries.filter(c => typeof c.countryCode === 'string' && typeof c.name === 'string');
        await setCache(cacheKey, valid);
        return valid;
    } catch {
        return [];
    }
}
