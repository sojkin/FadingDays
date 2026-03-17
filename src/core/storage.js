/**
 * Fading Days – Storage layer (chrome.storage.sync)
 * Persists user configuration across devices via browser cloud sync.
 */

const DEFAULT_DATA = {
    language: 'en',
    birthDate: null,
    lifeExpectancy: null,
    country: null, // null = auto-detect from locale
    metricsOrder: ['weekends', 'christmasEves', 'easters', 'vacations', 'publicHolidays', 'workingDays', 'daysOff'],
    enabledMetrics: {
        weekends: true,
        christmasEves: true,
        easters: true,
        vacations: true,
        publicHolidays: false,
        workingDays: false,
        daysOff: false,
    },
    targets: [
        {
            id: 'default',
            name: 'Retirement',
            mode: 'date',
            date: null,
            targetAge: null,
            isDefault: true,
        },
    ],
    activeTargetId: 'default',
};

/**
 * Load data from chrome.storage.sync.
 * @returns {Promise<object>}
 */
export async function loadData() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('fadingDays', (result) => {
            if (chrome.runtime.lastError) {
                resolve({ ...DEFAULT_DATA });
                return;
            }
            const data = result.fadingDays || { ...DEFAULT_DATA };
            // Migration for older data
            if (!data.language) {
                data.language = 'en';
            }
            if (!data.enabledMetrics) {
                data.enabledMetrics = { weekends: true, christmasEves: true, easters: true, vacations: true, publicHolidays: false, workingDays: false };
            }
            if (data.enabledMetrics.publicHolidays === undefined) {
                data.enabledMetrics.publicHolidays = false;
            }
            if (data.enabledMetrics.workingDays === undefined) {
                data.enabledMetrics.workingDays = false;
            }
            if (data.enabledMetrics.daysOff === undefined) {
                data.enabledMetrics.daysOff = false;
            }
            if (data.country === undefined) {
                data.country = null;
            }
            if (!data.metricsOrder) {
                data.metricsOrder = ['weekends', 'christmasEves', 'easters', 'vacations', 'publicHolidays', 'workingDays', 'daysOff'];
            }
            // Ensure new metrics are in the order array
            const allMetrics = ['weekends', 'christmasEves', 'easters', 'vacations', 'publicHolidays', 'workingDays', 'daysOff'];
            for (const m of allMetrics) {
                if (!data.metricsOrder.includes(m)) {
                    data.metricsOrder.push(m);
                }
            }
            if (data.lifeExpectancy === undefined) {
                data.lifeExpectancy = null;
            }
            // Migrate targets: add mode + targetAge if missing
            if (data.targets) {
                data.targets.forEach(t => {
                    if (!t.mode) t.mode = 'date';
                    if (t.targetAge === undefined) t.targetAge = null;
                });
            }
            resolve(data);
        });
    });
}

/**
 * Save data to chrome.storage.sync.
 * @param {object} data
 * @returns {Promise<void>}
 */
export async function saveData(data) {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ fadingDays: data }, () => {
            if (chrome.runtime.lastError) { /* ignore */ }
            resolve();
        });
    });
}

/**
 * Get the currently active target.
 * @returns {Promise<object|null>}
 */
export async function getActiveTarget() {
    const data = await loadData();
    return data.targets.find((t) => t.id === data.activeTargetId) || data.targets[0] || null;
}

/**
 * Set the active target by ID.
 * @param {string} targetId
 */
export async function setActiveTarget(targetId) {
    const data = await loadData();
    data.activeTargetId = targetId;
    await saveData(data);
}

/**
 * Generate a unique target ID.
 * @returns {string}
 */
export function generateId() {
    return 'target_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
}
