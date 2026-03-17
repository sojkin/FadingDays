/**
 * Fading Days – Popup Logic
 * Displays countdown metrics and handles target navigation.
 */
import { computeAll, lifeProgress, lifeEndDate, resolveTargetDate, publicHolidaysRemaining, workingDaysRemaining, daysOffRemaining, getToday } from '../core/calculations.js';
import { loadData, setActiveTarget } from '../core/storage.js';
import { setLanguage, t, applyTranslations } from '../core/i18n.js';
import { getHolidaysForRange, getCountryFromLocale } from '../core/holidays.js';

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
const metricsGrid = document.getElementById('metricsGrid');
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

        element.textContent = current.toString();

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
async function render() {
    if (!currentData || !currentData.targets || currentData.targets.length === 0) {
        showEmpty();
        return;
    }

    // Find active target index (fallback to isDefault, then first)
    let activeIdx = currentData.targets.findIndex(
        (target) => target.id === currentData.activeTargetId
    );
    if (activeIdx < 0) {
        activeIdx = currentData.targets.findIndex((target) => target.isDefault);
    }
    currentIndex = activeIdx >= 0 ? activeIdx : 0;
    const target = currentData.targets[currentIndex];

    const targetDate = resolveTargetDate(target, currentData.birthDate);
    if (!target || !targetDate || isNaN(targetDate.getTime())) {
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

    // Build dynamic metrics grid
    const enabled = currentData.enabledMetrics || {};
    const metricDefs = [
        { key: 'weekends', value: metrics.weekends, label: 'weekends' },
        { key: 'christmasEves', value: metrics.christmasEves, label: 'christmasEves' },
        { key: 'easters', value: metrics.easters, label: 'easters' },
        { key: 'vacations', value: metrics.vacations, label: 'vacations' },
    ];

    // Fetch holidays if needed for publicHolidays or workingDays metrics
    const needsHolidays = enabled.publicHolidays || enabled.workingDays || enabled.daysOff;
    let holidaySet = new Set();
    if (needsHolidays) {
        const today = getToday();
        const country = currentData.country || getCountryFromLocale();
        holidaySet = await getHolidaysForRange(country, today, targetDate);
        if (enabled.publicHolidays) {
            metricDefs.push({ key: 'publicHolidays', value: publicHolidaysRemaining(today, targetDate, holidaySet), label: 'publicHolidays' });
        }
        if (enabled.workingDays) {
            metricDefs.push({ key: 'workingDays', value: workingDaysRemaining(today, targetDate, holidaySet), label: 'workingDays' });
        }
        if (enabled.daysOff) {
            metricDefs.push({ key: 'daysOff', value: daysOffRemaining(today, targetDate, holidaySet), label: 'daysOff' });
        }
    }

    const activeMetrics = metricDefs.filter(m => enabled[m.key]);

    metricsGrid.innerHTML = '';
    if (activeMetrics.length > 0) {
        metricsGrid.classList.remove('hidden');
        metricsGrid.setAttribute('data-count', activeMetrics.length);
        activeMetrics.forEach(m => {
            const div = document.createElement('div');
            div.className = 'metric';
            const valueSpan = document.createElement('span');
            valueSpan.className = 'metric-value';
            valueSpan.textContent = '—';
            const labelSpan = document.createElement('span');
            labelSpan.className = 'metric-label';
            labelSpan.textContent = t(m.label);
            div.appendChild(valueSpan);
            div.appendChild(labelSpan);
            metricsGrid.appendChild(div);
            animateNumber(valueSpan, m.value, 600);
        });
    } else {
        metricsGrid.classList.add('hidden');
    }

    // Life progress bar (requires birth date AND life expectancy)
    if (currentData.birthDate && currentData.lifeExpectancy) {
        const birthDate = new Date(currentData.birthDate);
        if (!isNaN(birthDate.getTime())) {
            const endDate = lifeEndDate(birthDate, currentData.lifeExpectancy);
            const progress = lifeProgress(birthDate, endDate);
            const percent = Math.round(progress * 100);

            progressContainer.classList.remove('hidden');

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
