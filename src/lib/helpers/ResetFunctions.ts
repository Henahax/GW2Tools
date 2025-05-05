export function getUTCTimeForStartOfNextDay() {
    let now = new Date();
    let tomorrow = new Date(now);

    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);

    return tomorrow;
}

export function getUTCTimeForStartOfNextWeek() {
    let now = new Date();
    let nextMonday = new Date();

    while (nextMonday.getUTCDay() !== 1) {
        nextMonday.setUTCDate(nextMonday.getUTCDate() + 1);
    }

    nextMonday.setUTCHours(7, 30, 0, 0);

    if (nextMonday < now) {
        nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);
    }

    return nextMonday;
}
