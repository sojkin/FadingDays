/**
 * Fading Days – Options Page Logic
 * Manages targets, birth date, and language settings.
 */
import { loadData, saveData, generateId } from '../core/storage.js';
import { SUPPORTED_LANGUAGES, setLanguage, t, applyTranslations } from '../core/i18n.js';

// --- DOM Elements ---
const languageSelect = document.getElementById('languageSelect');
const birthDateInput = document.getElementById('birthDate');
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
        const card = document.createElement('div');
        card.className = 'target-card' + (index === 0 ? ' is-default' : '');

        // Card header with badge and delete button
        const header = document.createElement('div');
        header.className = 'target-card-header';

        const badge = document.createElement('span');
        badge.className = 'target-badge';
        badge.textContent =
            index === 0 ? t('defaultBadge') : t('targetBadge', { n: index + 1 });
        header.appendChild(badge);

        // Delete button (only if more than one target exists)
        if (data.targets.length > 1) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = t('deleteTarget');
            deleteBtn.addEventListener('click', () => deleteTarget(index));
            header.appendChild(deleteBtn);
        }

        card.appendChild(header);

        // Input fields (name + date)
        const fields = document.createElement('div');
        fields.className = 'target-fields';

        // Name field
        const nameField = document.createElement('div');
        nameField.className = 'field';
        nameField.innerHTML = `
            <label class="label">${escapeHtml(t('targetName'))}</label>
            <input type="text" class="input target-name-input"
                   placeholder="${escapeHtml(t('targetNamePlaceholder'))}"
                   value="${escapeHtml(target.name || '')}">
        `;
        fields.appendChild(nameField);

        // Date field
        const dateField = document.createElement('div');
        dateField.className = 'field';
        dateField.innerHTML = `
            <label class="label">${escapeHtml(t('targetDate'))}</label>
            <input type="date" class="input target-date-input"
                   value="${target.date || ''}">
        `;
        fields.appendChild(dateField);

        card.appendChild(fields);

        // Bind input change listeners for auto-save
        const nameInput = nameField.querySelector('.target-name-input');
        const dateInput = dateField.querySelector('.target-date-input');

        nameInput.addEventListener('input', () => {
            data.targets[index].name = nameInput.value;
            autoSave();
        });

        dateInput.addEventListener('input', () => {
            data.targets[index].date = dateInput.value || null;
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
        date: null,
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
 * Delete a target by index.
 * @param {number} index
 */
function deleteTarget(index) {
    const removed = data.targets.splice(index, 1)[0];

    // If the removed target was active, reset to first available
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
