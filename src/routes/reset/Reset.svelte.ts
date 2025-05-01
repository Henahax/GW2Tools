import { getUTCTimeForStartOfNextWeek, getUTCTimeForStartOfNextDay } from "$lib/functions/ResetFunctions.svelte";

export class Reset {
    intervals = $state<ResetInterval[]>([]);

    constructor(data?: any[]) {
        if (data) {
            this.intervals = data.map(interval => {
                let resetInterval = Object.assign(new ResetInterval(), interval);
                resetInterval.interval = interval.interval === "weekly" ? Interval.weekly : Interval.daily;
                resetInterval.categories = interval.categories.map((category: any) => {
                    let resetCategory = Object.assign(new ResetCategory(), category);
                    resetCategory.tasks = category.tasks.map((task: any) => {
                        let resetTask = Object.assign(new ResetTask(), task);
                        if (task.timer) {
                            resetTask.timer = Object.assign(new ResetTimer(), task.timer);
                            resetTask.timer.duration = task.timer.duration.map((duration: any) => {
                                // todo
                            });
                            resetTask.timer.times = task.timer.times.map((time: any) => {
                                // todo
                            });
                        }
                        return resetTask;
                    });
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
    timer? = $state<ResetTimer>()

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
    times = $state<[number, number, string?][]>([[0, 0]])
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
