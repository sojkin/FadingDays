/**
 * Fading Days – Storage layer (chrome.storage.sync)
 * Persists user configuration across devices via browser cloud sync.
 */

const DEFAULT_DATA = {
    language: 'en',
    birthDate: null,
    targets: [
        {
            id: 'default',
            name: 'Retirement',
            date: null,
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
            const data = result.fadingDays || { ...DEFAULT_DATA };
            // Ensure language field exists (migration for older data)
            if (!data.language) {
                data.language = 'en';
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
        chrome.storage.sync.set({ fadingDays: data }, resolve);
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
    return 'target_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
