/**
 * Fading Days – Options Page Logic
 * Manages targets, birth date, and language settings.
 */
import { loadData, saveData, generateId } from '../core/storage.js';
import { SUPPORTED_LANGUAGES, setLanguage, t, applyTranslations } from '../core/i18n.js';

// --- DOM Elements ---
const languageSelect = document.getElementById('languageSelect');
const birthDateInput = document.getElementById('birthDate');
const lifeExpectancyInput = document.getElementById('lifeExpectancy');
const metricWeekends = document.getElementById('metricWeekends');
const metricChristmas = document.getElementById('metricChristmas');
const metricEasters = document.getElementById('metricEasters');
const metricVacations = document.getElementById('metricVacations');
const targetsList = document.getElementById('targetsList');
const addTargetBtn = document.getElementById('addTarget');
const saveStatusEl = document.getElementById('saveStatus');

let data = null;
let saveTimeout = null;

/**
 * Populate the language dropdown with supported languages.
 */
function populateLanguageSelect() {
    languageSelect.innerHTML = '';
    for (const lang of SUPPORTED_LANGUAGES) {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        if (lang.code === data.language) {
            option.selected = true;
        }
        languageSelect.appendChild(option);
    }
}

/**
 * Render the list of target cards.
 */
function renderTargets() {
    targetsList.innerHTML = '';

    data.targets.forEach((target, index) => {
        const isDefault = target.isDefault === true;
        const card = document.createElement('div');
        card.className = 'target-card' + (isDefault ? ' is-default' : '');

        // Card header with badge and actions
        const header = document.createElement('div');
        header.className = 'target-card-header';

        const badge = document.createElement('span');
        badge.className = 'target-badge';
        badge.textContent = isDefault ? t('defaultBadge') : t('targetBadge', { n: index + 1 });
        header.appendChild(badge);

        const headerActions = document.createElement('div');
        headerActions.style.display = 'flex';
        headerActions.style.gap = '8px';

        // Set as default button (only for non-default targets)
        if (!isDefault) {
            const defaultBtn = document.createElement('button');
            defaultBtn.className = 'btn-set-default';
            defaultBtn.textContent = t('setAsDefault');
            defaultBtn.addEventListener('click', () => setDefaultTarget(index));
            headerActions.appendChild(defaultBtn);
        }

        // Delete button (only if more than one target exists)
        if (data.targets.length > 1) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = t('deleteTarget');
            deleteBtn.addEventListener('click', () => deleteTarget(index));
            headerActions.appendChild(deleteBtn);
        }

        header.appendChild(headerActions);
        card.appendChild(header);

        // Mode toggle (date / age)
        const modeToggle = document.createElement('div');
        modeToggle.className = 'mode-toggle';

        const modeDateBtn = document.createElement('button');
        modeDateBtn.className = 'mode-btn' + (target.mode !== 'age' ? ' active' : '');
        modeDateBtn.textContent = t('modeDate');
        modeDateBtn.type = 'button';

        const modeAgeBtn = document.createElement('button');
        modeAgeBtn.className = 'mode-btn' + (target.mode === 'age' ? ' active' : '');
        modeAgeBtn.textContent = t('modeAge');
        modeAgeBtn.type = 'button';

        modeToggle.appendChild(modeDateBtn);
        modeToggle.appendChild(modeAgeBtn);
        card.appendChild(modeToggle);

        // Input fields (name + date/age)
        const fields = document.createElement('div');
        fields.className = 'target-fields';

        // Name field
        const nameField = document.createElement('div');
        nameField.className = 'field';
        const nameLabel = document.createElement('label');
        nameLabel.className = 'label';
        nameLabel.textContent = t('targetName');
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'input target-name-input';
        nameInput.placeholder = t('targetNamePlaceholder');
        nameInput.value = target.name || '';
        nameField.appendChild(nameLabel);
        nameField.appendChild(nameInput);
        fields.appendChild(nameField);

        // Date field
        const dateField = document.createElement('div');
        dateField.className = 'field';
        const dateLabel = document.createElement('label');
        dateLabel.className = 'label';
        dateLabel.textContent = t('targetDate');
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.className = 'input target-date-input';
        dateInput.value = target.date || '';
        dateField.appendChild(dateLabel);
        dateField.appendChild(dateInput);

        // Age field
        const ageField = document.createElement('div');
        ageField.className = 'field';
        const ageLabel = document.createElement('label');
        ageLabel.className = 'label';
        ageLabel.textContent = t('targetAge');
        const ageInput = document.createElement('input');
        ageInput.type = 'number';
        ageInput.className = 'input';
        ageInput.min = '1';
        ageInput.max = '150';
        ageInput.value = target.targetAge || '';
        ageField.appendChild(ageLabel);
        ageField.appendChild(ageInput);

        // Warning if age mode without birth date
        const ageWarning = document.createElement('span');
        ageWarning.className = 'age-warning';
        ageWarning.textContent = t('requiresBirthDate');
        ageField.appendChild(ageWarning);

        // Show/hide based on mode
        if (target.mode === 'age') {
            dateField.style.display = 'none';
            ageField.style.display = '';
            ageWarning.style.display = data.birthDate ? 'none' : '';
        } else {
            dateField.style.display = '';
            ageField.style.display = 'none';
        }

        fields.appendChild(dateField);
        fields.appendChild(ageField);
        card.appendChild(fields);

        // Mode toggle handlers
        modeDateBtn.addEventListener('click', () => {
            data.targets[index].mode = 'date';
            renderTargets();
            autoSave();
        });
        modeAgeBtn.addEventListener('click', () => {
            data.targets[index].mode = 'age';
            renderTargets();
            autoSave();
        });

        // Bind input change listeners for auto-save
        nameInput.addEventListener('input', () => {
            data.targets[index].name = nameInput.value;
            autoSave();
        });

        dateInput.addEventListener('input', () => {
            data.targets[index].date = dateInput.value || null;
            autoSave();
        });

        ageInput.addEventListener('input', () => {
            const val = parseInt(ageInput.value, 10);
            data.targets[index].targetAge = (val > 0 && val <= 150) ? val : null;
            autoSave();
        });

        targetsList.appendChild(card);
    });
}

/**
 * Add a new empty target.
 */
function addTarget() {
    const newTarget = {
        id: generateId(),
        name: '',
        mode: 'date',
        date: null,
        targetAge: null,
        isDefault: false,
    };
    data.targets.push(newTarget);
    renderTargets();
    autoSave();

    // Focus on the newly added target's name input
    setTimeout(() => {
        const inputs = targetsList.querySelectorAll('.target-name-input');
        if (inputs.length > 0) {
            inputs[inputs.length - 1].focus();
        }
    }, 100);
}

/**
 * Set a target as the default.
 * @param {number} index
 */
function setDefaultTarget(index) {
    data.targets.forEach((t, i) => {
        t.isDefault = i === index;
    });
    data.activeTargetId = data.targets[index].id;
    renderTargets();
    autoSave();
}

/**
 * Delete a target by index.
 * @param {number} index
 */
function deleteTarget(index) {
    const removed = data.targets.splice(index, 1)[0];

    // If the removed target was default or active, reset to first available
    if (removed.isDefault && data.targets.length > 0) {
        data.targets[0].isDefault = true;
    }
    if (data.activeTargetId === removed.id && data.targets.length > 0) {
        data.activeTargetId = data.targets[0].id;
    }

    renderTargets();
    autoSave();
}

/**
 * Debounced auto-save to chrome.storage.sync.
 */
function autoSave() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
        await saveData(data);
        showSaveStatus();
    }, 500);
}

/**
 * Briefly show the "Saved" toast notification.
 */
function showSaveStatus() {
    saveStatusEl.classList.remove('hidden');

    // Re-trigger animation by forcing reflow
    saveStatusEl.style.animation = 'none';
    void saveStatusEl.offsetHeight;
    saveStatusEl.style.animation = '';

    setTimeout(() => {
        saveStatusEl.classList.add('hidden');
    }, 1500);
}

/**
 * Escape HTML entities to prevent XSS in dynamic content.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Refresh all translated UI elements (static + dynamic).
 */
function refreshUI() {
    applyTranslations();
    renderTargets();
}

/**
 * Initialize the options page: load data, set language, render everything.
 */
async function init() {
    data = await loadData();

    // Ensure at least one target exists
    if (!data.targets || data.targets.length === 0) {
        data.targets = [
            {
                id: 'default',
                name: t('defaultTargetName'),
                date: null,
                isDefault: true,
            },
        ];
        data.activeTargetId = 'default';
    }

    // Set language and apply translations
    setLanguage(data.language || 'en');
    populateLanguageSelect();
    applyTranslations();

    // Birth date
    if (data.birthDate) {
        birthDateInput.value = data.birthDate;
    }

    birthDateInput.addEventListener('input', () => {
        data.birthDate = birthDateInput.value || null;
        autoSave();
    });

    // Life expectancy
    if (data.lifeExpectancy) {
        lifeExpectancyInput.value = data.lifeExpectancy;
    }

    lifeExpectancyInput.addEventListener('input', () => {
        const val = parseInt(lifeExpectancyInput.value, 10);
        data.lifeExpectancy = (val > 0 && val <= 150) ? val : null;
        autoSave();
    });

    // Metrics toggles
    metricWeekends.checked = data.enabledMetrics.weekends;
    metricChristmas.checked = data.enabledMetrics.christmasEves;
    metricEasters.checked = data.enabledMetrics.easters;
    metricVacations.checked = data.enabledMetrics.vacations;

    metricWeekends.addEventListener('change', () => {
        data.enabledMetrics.weekends = metricWeekends.checked;
        autoSave();
    });
    metricChristmas.addEventListener('change', () => {
        data.enabledMetrics.christmasEves = metricChristmas.checked;
        autoSave();
    });
    metricEasters.addEventListener('change', () => {
        data.enabledMetrics.easters = metricEasters.checked;
        autoSave();
    });
    metricVacations.addEventListener('change', () => {
        data.enabledMetrics.vacations = metricVacations.checked;
        autoSave();
    });

    // Language change handler
    languageSelect.addEventListener('change', () => {
        data.language = languageSelect.value;
        setLanguage(data.language);
        refreshUI();
        autoSave();
    });

    // Add target button
    addTargetBtn.addEventListener('click', addTarget);

    // Initial render
    renderTargets();
}

init();
