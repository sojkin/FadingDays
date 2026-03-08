/**
 * Fading Days – Calculation Engine
 * Computes remaining days, weekends, Christmas Eves, Easters, and vacations.
 */

/**
 * Gauss algorithm – computes the date of Easter Sunday for a given year.
 * @param {number} year
 * @returns {Date}
 */
export function computeEaster(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = March, 4 = April
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
}

/**
 * Returns today's date at midnight (no time component).
 * @returns {Date}
 */
export function getToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Computes the number of full days between a start date and a target date.
 * @param {Date} from
 * @param {Date} to
 * @returns {number}
 */
export function daysRemaining(from, to) {
    const diffMs = to.getTime() - from.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Computes the number of full weekends (Saturday + Sunday) between dates.
 * A weekend is counted only if both Saturday and Sunday fall within the range.
 * @param {Date} from
 * @param {Date} to
 * @returns {number}
 */
export function weekendsRemaining(from, to) {
    const totalDays = daysRemaining(from, to);
    if (totalDays <= 0) return 0;

    let count = 0;
    const current = new Date(from);

    // Advance to the nearest Saturday
    while (current.getDay() !== 6 && current < to) {
        current.setDate(current.getDate() + 1);
    }

    // Count full weekends (Saturday + Sunday pairs)
    while (current < to) {
        const sunday = new Date(current);
        sunday.setDate(sunday.getDate() + 1);
        if (sunday <= to) {
            count++;
        }
        current.setDate(current.getDate() + 7);
    }

    return count;
}

/**
 * Computes the number of Christmas Eves (December 24) between dates.
 * @param {Date} from
 * @param {Date} to
 * @returns {number}
 */
export function christmasEvesRemaining(from, to) {
    let count = 0;
    for (let year = from.getFullYear(); year <= to.getFullYear(); year++) {
        const eve = new Date(year, 11, 24); // December = 11
        if (eve > from && eve <= to) {
            count++;
        }
    }
    return count;
}

/**
 * Computes the number of Easter Sundays between dates.
 * Uses the Gauss algorithm for movable Easter date calculation.
 * @param {Date} from
 * @param {Date} to
 * @returns {number}
 */
export function eastersRemaining(from, to) {
    let count = 0;
    for (let year = from.getFullYear(); year <= to.getFullYear(); year++) {
        const easter = computeEaster(year);
        if (easter > from && easter <= to) {
            count++;
        }
    }
    return count;
}

/**
 * Computes the number of summer vacations (July 1) between dates.
 * @param {Date} from
 * @param {Date} to
 * @returns {number}
 */
export function vacationsRemaining(from, to) {
    let count = 0;
    for (let year = from.getFullYear(); year <= to.getFullYear(); year++) {
        const vacation = new Date(year, 6, 1); // July = 6
        if (vacation > from && vacation <= to) {
            count++;
        }
    }
    return count;
}

/**
 * Computes all metrics for a given target date.
 * @param {Date} targetDate
 * @returns {{ days: number, weekends: number, christmasEves: number, easters: number, vacations: number }}
 */
export function computeAll(targetDate) {
    const today = getToday();
    return {
        days: daysRemaining(today, targetDate),
        weekends: weekendsRemaining(today, targetDate),
        christmasEves: christmasEvesRemaining(today, targetDate),
        easters: eastersRemaining(today, targetDate),
        vacations: vacationsRemaining(today, targetDate),
    };
}

/**
 * Computes life progress (0–1) based on birth date and target date.
 * @param {Date} birthDate
 * @param {Date} targetDate
 * @returns {number}
 */
export function lifeProgress(birthDate, targetDate) {
    const today = getToday();
    const totalLife = targetDate.getTime() - birthDate.getTime();
    const lived = today.getTime() - birthDate.getTime();
    if (totalLife <= 0) return 1;
    return Math.min(1, Math.max(0, lived / totalLife));
}
