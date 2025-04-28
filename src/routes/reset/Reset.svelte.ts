export class Reset {
    intervals = $state<ResetInterval[]>([]);

    constructor(data?: any[]) {
        if (data) {
            this.intervals = data.map(interval => {
                let resetInterval = Object.assign(new ResetInterval(), interval);
                resetInterval.interval = interval.interval === "weekly" ? Interval.weekly : Interval.daily;
                resetInterval.updateTime(); // Call updateTime after setting the interval
                resetInterval.categories = interval.categories.map((category: any) => {
                    let resetCategory = Object.assign(new ResetCategory(), category);
                    resetCategory.tasks = category.tasks.map((task: any) => Object.assign(new ResetTask(), task));
                    return resetCategory;
                });
                return resetInterval;
            });
        }
    }
}

export class ResetInterval {
    id = "";
    interval: Interval = Interval.daily;
    timer = "";
    tasks = "";
    reset = ""
    icon = "";
    categories = $state<ResetCategory[]>([]);

    time = $state(0);

    constructor() {
        this.updateTime();
    }

    updateTime() {
        this.time = this.getTime();
    }

    getTime() {
        if (this.interval === Interval.daily) {
            return getUTCTimeForStartOfNextDay().getTime();
        } else if (this.interval === Interval.weekly) {
            return getUTCTimeForStartOfNextWeek().getTime();
        }
        return 0;
    }
}

export class ResetCategory {
    id = "";
    name = "";
    open = $state(true);
    tasks = $state<ResetTask[]>([]);

    toggleOpen() {
        this.open = !this.open;
    }
}

export class ResetTask {
    id = "";
    display = $state(false);
    checked = $state(false);
    name = "";
    icon = "";
    link = "";
    description? = "";
    location? = "";
    timers? = $state<ResetTimer>()

    setDisplay(value: boolean) {
        this.display = value;
        setCookie(this.id, CookieType.display);
    }

    setChecked(value: boolean, interval: ResetInterval, category: ResetCategory) {
        this.checked = value;

        if (category.tasks.filter(task => task.display).filter(task => !task.checked).length === 0) {
            category.open = false;
        }

        setCookie(this.id, CookieType.checked, interval.interval);
    }
}

export class ResetTimer {
    duration = $state<[number, number]>([0, 0]);
    times = $state<[number, number][]>([[0, 0]])
}

enum Interval { daily, weekly }
enum CookieType { checked, display }

function setCookie(taskId: string, type: CookieType, interval?: Interval) {
    let time = new Date().getTime();
    let value: boolean = false;
    let suffix: string = "";
    if (type === CookieType.display) {
        suffix = ".display";
        time += 365 * 24 * 60 * 60 * 1000;
    } else if (type === CookieType.checked && interval) {
        switch (interval as Interval) {
            case Interval.weekly: {
                suffix = ".weekly";
                time = getUTCTimeForStartOfNextWeek().getTime();
                break;
            }
            case Interval.daily: {
                suffix = ".daily";
                time = getUTCTimeForStartOfNextDay().getTime();
                break;
            }
            default: {
                return;
            }
        }
    }
    document.cookie = taskId + suffix + '=' + value + ';expires=' + new Date(time).toUTCString() + ';path=/';
}

function getUTCTimeForStartOfNextDay() {
    let now = new Date();
    let tomorrow = new Date(now);

    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);

    return tomorrow;
}

function getUTCTimeForStartOfNextWeek() {
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
