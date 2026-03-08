/**
 * Fading Days – Popup Logic
 * Displays countdown metrics and handles target navigation.
 */
import { computeAll, lifeProgress } from '../core/calculations.js';
import { loadData, setActiveTarget } from '../core/storage.js';
import { setLanguage, t, applyTranslations } from '../core/i18n.js';

// --- DOM Elements ---
const targetNameEl = document.getElementById('targetName');
const prevTargetBtn = document.getElementById('prevTarget');
const nextTargetBtn = document.getElementById('nextTarget');
const emptyStateEl = document.getElementById('emptyState');
const mainSectionEl = document.getElementById('mainSection');
const daysCountEl = document.getElementById('daysCount');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const weekendsCountEl = document.getElementById('weekendsCount');
const christmasCountEl = document.getElementById('christmasCount');
const easterCountEl = document.getElementById('easterCount');
const vacationCountEl = document.getElementById('vacationCount');
const openOptionsBtn = document.getElementById('openOptions');
const openOptionsEmptyBtn = document.getElementById('openOptionsEmpty');

let currentData = null;
let currentIndex = 0;

/**
 * Animate a number from 0 to target value with easing.
 * @param {HTMLElement} element - Target DOM element
 * @param {number} targetValue - Final number to display
 * @param {number} duration - Animation duration in ms
 */
function animateNumber(element, targetValue, duration = 600) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (targetValue - start) * eased);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    if (targetValue === 0) {
        element.textContent = '0';
        return;
    }

    requestAnimationFrame(update);
}

/**
 * Render the popup UI based on current data and active target.
 */
function render() {
    if (!currentData || !currentData.targets || currentData.targets.length === 0) {
        showEmpty();
        return;
    }

    // Find active target index
    const activeIdx = currentData.targets.findIndex(
        (target) => target.id === currentData.activeTargetId
    );
    currentIndex = activeIdx >= 0 ? activeIdx : 0;
    const target = currentData.targets[currentIndex];

    if (!target || !target.date) {
        showEmpty();
        return;
    }

    const targetDate = new Date(target.date);
    if (isNaN(targetDate.getTime())) {
        showEmpty();
        return;
    }

    // Show main section, hide empty state
    emptyStateEl.classList.add('hidden');
    mainSectionEl.classList.remove('hidden');

    // Display target name
    targetNameEl.textContent = target.name || t('target');

    // Show/hide navigation arrows
    const hasMultiple = currentData.targets.length > 1;
    prevTargetBtn.style.visibility = hasMultiple ? 'visible' : 'hidden';
    nextTargetBtn.style.visibility = hasMultiple ? 'visible' : 'hidden';

    // Compute and animate metrics
    const metrics = computeAll(targetDate);

    animateNumber(daysCountEl, metrics.days, 800);
    animateNumber(weekendsCountEl, metrics.weekends, 600);
    animateNumber(christmasCountEl, metrics.christmasEves, 600);
    animateNumber(easterCountEl, metrics.easters, 600);
    animateNumber(vacationCountEl, metrics.vacations, 600);

    // Life progress bar (requires birth date)
    if (currentData.birthDate) {
        const birthDate = new Date(currentData.birthDate);
        if (!isNaN(birthDate.getTime())) {
            const progress = lifeProgress(birthDate, targetDate);
            const percent = Math.round(progress * 100);

            progressContainer.classList.remove('hidden');

            // Animate progress bar with slight delay for visual effect
            setTimeout(() => {
                progressFill.style.width = percent + '%';
            }, 200);

            progressText.textContent = t('lifeProgress', { percent });
        } else {
            progressContainer.classList.add('hidden');
        }
    } else {
        progressContainer.classList.add('hidden');
    }
}

/**
 * Show the empty state when no valid target is configured.
 */
function showEmpty() {
    emptyStateEl.classList.remove('hidden');
    mainSectionEl.classList.add('hidden');
    targetNameEl.textContent = 'Fading Days';
    prevTargetBtn.style.visibility = 'hidden';
    nextTargetBtn.style.visibility = 'hidden';
}

/**
 * Navigate between targets (circular).
 * @param {number} direction - +1 for next, -1 for previous
 */
async function navigate(direction) {
    if (!currentData || currentData.targets.length <= 1) return;

    const len = currentData.targets.length;
    currentIndex = (currentIndex + direction + len) % len;
    const newTarget = currentData.targets[currentIndex];

    await setActiveTarget(newTarget.id);
    currentData.activeTargetId = newTarget.id;
    render();
}

// --- Event Listeners ---
prevTargetBtn.addEventListener('click', () => navigate(-1));
nextTargetBtn.addEventListener('click', () => navigate(1));

openOptionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
});

openOptionsEmptyBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
});

/**
 * Initialize the popup: load data, set language, render UI.
 */
async function init() {
    currentData = await loadData();

    // Set language from stored preference
    setLanguage(currentData.language || 'en');

    // Apply static translations (labels, titles, placeholders)
    applyTranslations();

    // Render dynamic content
    render();
}

init();
