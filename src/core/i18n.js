/**
 * Fading Days – Internationalization (i18n) module
 * Supports: English (en), Polish (pl), German (de)
 */

const translations = {
    en: {
        // Popup
        loading: 'Loading…',
        daysRemaining: 'days remaining',
        lifeProgress: '{percent}% of life behind you',
        weekends: 'Weekends',
        christmasEves: 'Christmas Eves',
        easters: 'Easters',
        vacations: 'Vacations',
        emptyStateText: 'Set a target date in options to start the countdown.',
        openOptions: 'Open options',
        prevTarget: 'Previous target',
        nextTarget: 'Next target',
        settings: 'Settings',
        target: 'Target',

        // Options
        optionsTitle: 'Configuration',
        birthDateSection: 'Date of Birth',
        birthDateDesc: 'Optional – used to display the life progress bar.',
        birthDateLabel: 'Date of birth',
        targetsSection: 'Targets (target dates)',
        targetsDesc: 'Add dates you want to count down to. The first target is the default.',
        targetName: 'Target name',
        targetDate: 'Target date',
        targetNamePlaceholder: 'e.g. Retirement',
        defaultBadge: '★ Default',
        targetBadge: 'Target #{n}',
        addTarget: 'Add new target',
        deleteTarget: 'Delete',
        saved: 'Saved',
        languageSection: 'Language',
        languageDesc: 'Choose the display language for the extension.',
        languageLabel: 'Language',
        defaultTargetName: 'Retirement',
        supportText: 'Buy me a coffee',
    },
    pl: {
        // Popup
        loading: 'Ładowanie…',
        daysRemaining: 'dni pozostało',
        lifeProgress: '{percent}% życia za Tobą',
        weekends: 'Weekendów',
        christmasEves: 'Wigilii',
        easters: 'Wielkanocnych',
        vacations: 'Wakacji',
        emptyStateText: 'Ustaw datę docelową w opcjach, aby rozpocząć odliczanie.',
        openOptions: 'Otwórz opcje',
        prevTarget: 'Poprzedni cel',
        nextTarget: 'Następny cel',
        settings: 'Ustawienia',
        target: 'Cel',

        // Options
        optionsTitle: 'Konfiguracja odliczania',
        birthDateSection: 'Data urodzenia',
        birthDateDesc: 'Opcjonalnie – służy do wyświetlania paska postępu życia.',
        birthDateLabel: 'Data urodzenia',
        targetsSection: 'Cele (daty docelowe)',
        targetsDesc: 'Dodaj daty, do których chcesz odliczać. Pierwszy cel jest domyślny.',
        targetName: 'Nazwa celu',
        targetDate: 'Data docelowa',
        targetNamePlaceholder: 'np. Emerytura',
        defaultBadge: '★ Domyślny',
        targetBadge: 'Cel #{n}',
        addTarget: 'Dodaj nowy cel',
        deleteTarget: 'Usuń',
        saved: 'Zapisano',
        languageSection: 'Język',
        languageDesc: 'Wybierz język wyświetlania rozszerzenia.',
        languageLabel: 'Język',
        defaultTargetName: 'Do Emerytury',
        supportText: 'Postaw mi kawę',
    },
    de: {
        // Popup
        loading: 'Laden…',
        daysRemaining: 'Tage verbleibend',
        lifeProgress: '{percent}% des Lebens hinter dir',
        weekends: 'Wochenenden',
        christmasEves: 'Heiligabende',
        easters: 'Ostern',
        vacations: 'Ferien',
        emptyStateText: 'Lege ein Zieldatum in den Optionen fest, um den Countdown zu starten.',
        openOptions: 'Optionen öffnen',
        prevTarget: 'Vorheriges Ziel',
        nextTarget: 'Nächstes Ziel',
        settings: 'Einstellungen',
        target: 'Ziel',

        // Options
        optionsTitle: 'Konfiguration',
        birthDateSection: 'Geburtsdatum',
        birthDateDesc: 'Optional – wird für den Lebensfortschrittsbalken verwendet.',
        birthDateLabel: 'Geburtsdatum',
        targetsSection: 'Ziele (Zieldaten)',
        targetsDesc: 'Füge Daten hinzu, zu denen du herunterzählen möchtest. Das erste Ziel ist Standard.',
        targetName: 'Zielname',
        targetDate: 'Zieldatum',
        targetNamePlaceholder: 'z.B. Ruhestand',
        defaultBadge: '★ Standard',
        targetBadge: 'Ziel #{n}',
        addTarget: 'Neues Ziel hinzufügen',
        deleteTarget: 'Löschen',
        saved: 'Gespeichert',
        languageSection: 'Sprache',
        languageDesc: 'Wähle die Anzeigesprache der Erweiterung.',
        languageLabel: 'Sprache',
        defaultTargetName: 'Ruhestand',
        supportText: 'Kauf mir einen Kaffee',
    },
};

const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'pl', name: 'Polski' },
    { code: 'de', name: 'Deutsch' },
];

let currentLang = 'en';

/**
 * Set the active language.
 * @param {string} langCode - Language code (en, pl, de)
 */
function setLanguage(langCode) {
    if (translations[langCode]) {
        currentLang = langCode;
    }
}

/**
 * Get the current language code.
 * @returns {string}
 */
function getLanguage() {
    return currentLang;
}

/**
 * Translate a key, optionally replacing placeholders.
 * Placeholders use the format {key}.
 * @param {string} key - Translation key
 * @param {object} [params] - Replacement parameters
 * @returns {string}
 */
function t(key, params = {}) {
    const dict = translations[currentLang] || translations.en;
    let text = dict[key] || translations.en[key] || key;

    for (const [param, value] of Object.entries(params)) {
        text = text.replace(`{${param}}`, value);
    }

    return text;
}

/**
 * Apply translations to all elements with data-i18n attributes.
 * Supports:
 *   data-i18n="key"              → sets textContent
 *   data-i18n-placeholder="key"  → sets placeholder
 *   data-i18n-title="key"        → sets title attribute
 */
function applyTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (key) el.textContent = t(key);
    });

    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) el.placeholder = t(key);
    });

    root.querySelectorAll('[data-i18n-title]').forEach((el) => {
        const key = el.getAttribute('data-i18n-title');
        if (key) el.title = t(key);
    });
}

export { translations, SUPPORTED_LANGUAGES, setLanguage, getLanguage, t, applyTranslations };
