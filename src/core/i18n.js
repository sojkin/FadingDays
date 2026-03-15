/**
 * Fading Days – Internationalization (i18n) module
 * Supports: English, Polish, German, Spanish, French, Korean, Chinese
 */

const translations = {
    en: {
        loading: 'Loading…',
        daysRemaining: 'days remaining',
        lifeProgress: 'Statistically {percent}% of life behind you',
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
        lifeExpectancySection: 'Life expectancy',
        lifeExpectancyDesc: 'Enter your statistical life expectancy to see the life progress bar.',
        lifeExpectancyLabel: 'Life expectancy (years)',
        metricsSection: 'Visible metrics',
        metricsDesc: 'Choose which countdowns to display in the popup.',
        setAsDefault: 'Set as default',
        modeDate: 'Date',
        modeAge: 'Age',
        targetAge: 'Target age (years)',
        requiresBirthDate: 'Requires date of birth',
    },
    pl: {
        loading: 'Ładowanie…',
        daysRemaining: 'dni pozostało',
        lifeProgress: 'Statystycznie {percent}% życia za Tobą',
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
        lifeExpectancySection: 'Statystyczna długość życia',
        lifeExpectancyDesc: 'Podaj przewidywaną długość życia, aby zobaczyć pasek postępu życia.',
        lifeExpectancyLabel: 'Długość życia (lata)',
        metricsSection: 'Widoczne metryki',
        metricsDesc: 'Wybierz, które odliczania wyświetlać w popupie.',
        setAsDefault: 'Ustaw jako domyślny',
        modeDate: 'Data',
        modeAge: 'Wiek',
        targetAge: 'Wiek docelowy (lata)',
        requiresBirthDate: 'Wymaga daty urodzenia',
    },
    de: {
        loading: 'Laden…',
        daysRemaining: 'Tage verbleibend',
        lifeProgress: 'Statistisch {percent}% des Lebens hinter dir',
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
        lifeExpectancySection: 'Lebenserwartung',
        lifeExpectancyDesc: 'Gib deine statistische Lebenserwartung ein, um den Lebensfortschrittsbalken anzuzeigen.',
        lifeExpectancyLabel: 'Lebenserwartung (Jahre)',
        metricsSection: 'Sichtbare Metriken',
        metricsDesc: 'Wähle aus, welche Countdowns im Popup angezeigt werden.',
        setAsDefault: 'Als Standard festlegen',
        modeDate: 'Datum',
        modeAge: 'Alter',
        targetAge: 'Zielalter (Jahre)',
        requiresBirthDate: 'Geburtsdatum erforderlich',
    },
    es: {
        loading: 'Cargando…',
        daysRemaining: 'días restantes',
        lifeProgress: 'Estadísticamente {percent}% de vida detrás de ti',
        weekends: 'Fines de semana',
        christmasEves: 'Nochebuenas',
        easters: 'Pascuas',
        vacations: 'Vacaciones',
        emptyStateText: 'Establece una fecha objetivo en las opciones para iniciar la cuenta regresiva.',
        openOptions: 'Abrir opciones',
        prevTarget: 'Objetivo anterior',
        nextTarget: 'Siguiente objetivo',
        settings: 'Ajustes',
        target: 'Objetivo',
        optionsTitle: 'Configuración',
        birthDateSection: 'Fecha de nacimiento',
        birthDateDesc: 'Opcional – se usa para mostrar la barra de progreso de vida.',
        birthDateLabel: 'Fecha de nacimiento',
        targetsSection: 'Objetivos (fechas objetivo)',
        targetsDesc: 'Añade fechas hasta las que quieras hacer cuenta regresiva. El primer objetivo es el predeterminado.',
        targetName: 'Nombre del objetivo',
        targetDate: 'Fecha objetivo',
        targetNamePlaceholder: 'ej. Jubilación',
        defaultBadge: '★ Predeterminado',
        targetBadge: 'Objetivo #{n}',
        addTarget: 'Añadir nuevo objetivo',
        deleteTarget: 'Eliminar',
        saved: 'Guardado',
        languageSection: 'Idioma',
        languageDesc: 'Elige el idioma de visualización de la extensión.',
        languageLabel: 'Idioma',
        defaultTargetName: 'Jubilación',
        supportText: 'Invítame un café',
        lifeExpectancySection: 'Esperanza de vida',
        lifeExpectancyDesc: 'Introduce tu esperanza de vida estadística para ver la barra de progreso de vida.',
        lifeExpectancyLabel: 'Esperanza de vida (años)',
        metricsSection: 'Métricas visibles',
        metricsDesc: 'Elige qué cuentas regresivas mostrar en el popup.',
        setAsDefault: 'Establecer como predeterminado',
        modeDate: 'Fecha',
        modeAge: 'Edad',
        targetAge: 'Edad objetivo (años)',
        requiresBirthDate: 'Requiere fecha de nacimiento',
    },
    fr: {
        loading: 'Chargement…',
        daysRemaining: 'jours restants',
        lifeProgress: 'Statistiquement {percent}% de vie derrière vous',
        weekends: 'Week-ends',
        christmasEves: 'Réveillons de Noël',
        easters: 'Pâques',
        vacations: 'Vacances',
        emptyStateText: 'Définissez une date cible dans les options pour lancer le compte à rebours.',
        openOptions: 'Ouvrir les options',
        prevTarget: 'Objectif précédent',
        nextTarget: 'Objectif suivant',
        settings: 'Paramètres',
        target: 'Objectif',
        optionsTitle: 'Configuration',
        birthDateSection: 'Date de naissance',
        birthDateDesc: 'Facultatif – utilisé pour afficher la barre de progression de vie.',
        birthDateLabel: 'Date de naissance',
        targetsSection: 'Objectifs (dates cibles)',
        targetsDesc: 'Ajoutez des dates pour lesquelles vous souhaitez un compte à rebours. Le premier objectif est celui par défaut.',
        targetName: "Nom de l'objectif",
        targetDate: 'Date cible',
        targetNamePlaceholder: 'ex. Retraite',
        defaultBadge: '★ Par défaut',
        targetBadge: 'Objectif #{n}',
        addTarget: 'Ajouter un objectif',
        deleteTarget: 'Supprimer',
        saved: 'Enregistré',
        languageSection: 'Langue',
        languageDesc: "Choisissez la langue d'affichage de l'extension.",
        languageLabel: 'Langue',
        defaultTargetName: 'Retraite',
        supportText: 'Offrez-moi un café',
        lifeExpectancySection: 'Espérance de vie',
        lifeExpectancyDesc: 'Entrez votre espérance de vie statistique pour afficher la barre de progression de vie.',
        lifeExpectancyLabel: 'Espérance de vie (années)',
        metricsSection: 'Métriques visibles',
        metricsDesc: "Choisissez quels décomptes afficher dans le popup.",
        setAsDefault: 'Définir par défaut',
        modeDate: 'Date',
        modeAge: 'Âge',
        targetAge: 'Âge cible (années)',
        requiresBirthDate: 'Date de naissance requise',
    },
    ko: {
        loading: '로딩 중…',
        daysRemaining: '일 남음',
        lifeProgress: '통계적으로 인생의 {percent}%가 지나갔습니다',
        weekends: '주말',
        christmasEves: '크리스마스 이브',
        easters: '부활절',
        vacations: '여름휴가',
        emptyStateText: '카운트다운을 시작하려면 옵션에서 목표 날짜를 설정하세요.',
        openOptions: '옵션 열기',
        prevTarget: '이전 목표',
        nextTarget: '다음 목표',
        settings: '설정',
        target: '목표',
        optionsTitle: '설정',
        birthDateSection: '생년월일',
        birthDateDesc: '선택사항 – 생애 진행률 표시줄에 사용됩니다.',
        birthDateLabel: '생년월일',
        targetsSection: '목표 (목표 날짜)',
        targetsDesc: '카운트다운할 날짜를 추가하세요. 첫 번째 목표가 기본값입니다.',
        targetName: '목표 이름',
        targetDate: '목표 날짜',
        targetNamePlaceholder: '예: 은퇴',
        defaultBadge: '★ 기본',
        targetBadge: '목표 #{n}',
        addTarget: '새 목표 추가',
        deleteTarget: '삭제',
        saved: '저장됨',
        languageSection: '언어',
        languageDesc: '확장 프로그램의 표시 언어를 선택하세요.',
        languageLabel: '언어',
        defaultTargetName: '은퇴',
        supportText: '커피 한 잔 사주기',
        lifeExpectancySection: '기대 수명',
        lifeExpectancyDesc: '생애 진행률 표시줄을 보려면 통계적 기대 수명을 입력하세요.',
        lifeExpectancyLabel: '기대 수명 (년)',
        metricsSection: '표시할 지표',
        metricsDesc: '팝업에 표시할 카운트다운을 선택하세요.',
        setAsDefault: '기본값으로 설정',
        modeDate: '날짜',
        modeAge: '나이',
        targetAge: '목표 나이 (년)',
        requiresBirthDate: '생년월일이 필요합니다',
    },
    zh: {
        loading: '加载中…',
        daysRemaining: '天剩余',
        lifeProgress: '统计上人生已过 {percent}%',
        weekends: '周末',
        christmasEves: '平安夜',
        easters: '复活节',
        vacations: '暑假',
        emptyStateText: '请在选项中设置目标日期以开始倒计时。',
        openOptions: '打开选项',
        prevTarget: '上一个目标',
        nextTarget: '下一个目标',
        settings: '设置',
        target: '目标',
        optionsTitle: '配置',
        birthDateSection: '出生日期',
        birthDateDesc: '可选 - 用于显示生命进度条。',
        birthDateLabel: '出生日期',
        targetsSection: '目标（目标日期）',
        targetsDesc: '添加您想要倒计时的日期。第一个目标为默认目标。',
        targetName: '目标名称',
        targetDate: '目标日期',
        targetNamePlaceholder: '例如：退休',
        defaultBadge: '★ 默认',
        targetBadge: '目标 #{n}',
        addTarget: '添加新目标',
        deleteTarget: '删除',
        saved: '已保存',
        languageSection: '语言',
        languageDesc: '选择扩展程序的显示语言。',
        languageLabel: '语言',
        defaultTargetName: '退休',
        supportText: '请我喝杯咖啡',
        lifeExpectancySection: '预期寿命',
        lifeExpectancyDesc: '输入您的统计预期寿命以显示生命进度条。',
        lifeExpectancyLabel: '预期寿命（年）',
        metricsSection: '可见指标',
        metricsDesc: '选择在弹出窗口中显示哪些倒计时。',
        setAsDefault: '设为默认',
        modeDate: '日期',
        modeAge: '年龄',
        targetAge: '目标年龄（岁）',
        requiresBirthDate: '需要出生日期',
    },
};

const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'pl', name: 'Polski' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
];

let currentLang = 'en';

/**
 * Set the active language.
 * @param {string} langCode - Language code
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
