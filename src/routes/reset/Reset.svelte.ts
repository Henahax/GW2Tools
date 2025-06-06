import { getUTCTimeForStartOfNextWeek, getUTCTimeForStartOfNextDay } from "$lib/helpers/ResetFunctions";

export class Reset {
    intervals = $state<ResetInterval[]>([]);

    constructor(data?: any[]) {
        if (data) {
            const cookies = getCookies();
            this.intervals = data.map(interval => {
                const resetInterval = new ResetInterval();
                resetInterval.id = interval.id;
                resetInterval.interval = interval.interval === "weekly" ? Interval.weekly : Interval.daily;
                resetInterval.timer = interval.timer;
                resetInterval.tasks = interval.tasks;
                resetInterval.reset = interval.reset;
                resetInterval.icon = interval.icon;

                resetInterval.categories = interval.categories.map((category: any) => {
                    const resetCategory = new ResetCategory();
                    resetCategory.id = category.id;
                    resetCategory.name = category.name;                    resetCategory.tasks = category.tasks.map((task: any) => {
                        const resetTask = new ResetTask();
                        resetTask.id = task.id;
                        resetTask.name = task.name;
                        resetTask.icon = task.icon;
                        resetTask.link = task.link;
                        if (task.description) resetTask.description = task.description;
                        if (task.location) resetTask.location = task.location;
                        if (task.chatcode) resetTask.chatcode = task.chatcode;
                        
                        // Set initial display value from JSON if present
                        if (typeof task.display === 'boolean') {
                            resetTask.display = task.display;
                        }

                        // Apply cookie states (these will override initial values)
                        cookies.filter(cookie => cookie.namespace === resetTask.id).forEach(cookie => {
                            if (cookie.subname === "display") {
                                resetTask.setDisplay(cookie.value === "true");
                            } else if (cookie.subname === "weekly" && interval.interval === "weekly") {
                                resetTask.setChecked(cookie.value === "true", resetInterval, resetCategory);
                            } else if (cookie.subname === "daily" && interval.interval === "daily") {
                                resetTask.setChecked(cookie.value === "true", resetInterval, resetCategory);
                            }
                        });

                        if (task.timer) {
                            resetTask.timer = new ResetTimer();
                            resetTask.timer.duration = task.timer.duration;
                            resetTask.timer.times = task.timer.times;
                        }
                        return resetTask;
                    });

                    // Update category open state based on initial task states
                    const displayedTasks = resetCategory.tasks.filter((task: ResetTask) => task.display);
                    const allDisplayedTasksChecked = displayedTasks.length > 0 && displayedTasks.every((task: ResetTask) => task.checked);
                    resetCategory.open = !allDisplayedTasksChecked;

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
    display: boolean = $state(false);
    checked: boolean = $state(false);
    name = "";
    icon = "";
    link = "";
    description? = "";
    location? = "";
    chatcode? = "";
    timer? = $state<ResetTimer>();

    setDisplay(value: boolean) {
        this.display = value;
        setCookie(value, this.id, CookieType.display);
    }

    setChecked(value: boolean, interval: ResetInterval, category: ResetCategory) {
        this.checked = value;

        const displayedTasks = category.tasks.filter(task => task.display);
        const allDisplayedTasksChecked = displayedTasks.length > 0 && displayedTasks.every(task => task.checked);
        category.open = !allDisplayedTasksChecked;

        setCookie(value, this.id, CookieType.checked, interval.interval);
    }
}

export class ResetTimer {
    duration = $state<[number, number]>([0, 0]);
    times = $state<[number, number, string?][]>([[0, 0]])
}

enum Interval { daily, weekly }
enum CookieType { checked, display }

function getCookies() {
    return typeof document !== 'undefined' ? document.cookie.split(';').map((cookie) => {
        const [name, value] = cookie.trim().split('=');
        const [namespace, subname] = name.split('.');
        return { namespace, subname, value };
    }) : [];
}

function setCookie(value: boolean, taskId: string, type: CookieType, interval?: Interval) {

    let time = new Date().getTime();
    let suffix: string = "";
    if (type === CookieType.display) {
        suffix = ".display";
        time += 365 * 24 * 60 * 60 * 1000;
    } else if (type === CookieType.checked) {
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
