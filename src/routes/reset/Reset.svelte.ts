import { getUTCTimeForStartOfNextWeek, getUTCTimeForStartOfNextDay } from "$lib/helpers/ResetFunctions";

interface ResetTimerData {
    duration: [number, number];
    times: [number, number, string?][];
}

interface ResetTaskData {
    id: string;
    name: string;
    icon: string;
    link: string;
    description?: string;
    location?: string;
    chatcode?: string;
    display?: boolean;
    timer?: ResetTimerData;
}

interface ResetCategoryData {
    id: string;
    name: string;
    tasks: ResetTaskData[];
}

interface ResetIntervalData {
    id: string;
    interval: "weekly" | "daily";
    timer: string;
    tasks: string;
    reset: string;
    icon: string;
    categories: ResetCategoryData[];
}

interface Cookie {
    namespace: string;
    subname: string;
    value: string;
}

export class Reset {
    intervals = $state<ResetInterval[]>([]);

    constructor(data?: ResetIntervalData[]) {
        if (data) {
            this.intervals = data.map(interval => {
                const resetInterval = new ResetInterval({
                    id: interval.id,
                    interval: interval.interval === "weekly" ? Interval.weekly : Interval.daily,
                    timer: interval.timer,
                    tasks: interval.tasks,
                    reset: interval.reset,
                    icon: interval.icon
                });

                resetInterval.categories = interval.categories.map((category: any) => {
                    const resetCategory = new ResetCategory(category.id, category.name);                    // Create tasks with clean state to avoid any state sharing
                    resetCategory.tasks = category.tasks.map((task: any) => {
                        const resetTask = new ResetTask({
                            id: task.id,
                            name: task.name,
                            icon: task.icon,
                            link: task.link,
                            description: task.description,
                            location: task.location,
                            chatcode: task.chatcode,
                            display: task.display ?? false  // Set initial display value from JSON
                        });

                        // Initialize timer if present in task data
                        if (task.timer) {
                            resetTask.timer = new ResetTimer(task.timer.duration, task.timer.times);
                        }
                        return resetTask;
                    });
                    return resetCategory;
                });
                return resetInterval;
            });

            // Defer cookie application until after hydration
            if (typeof window !== 'undefined') {
                queueMicrotask(() => {
                    const cookies = getCookies();
                    this.intervals.forEach(interval => {
                        interval.categories.forEach(category => {
                            // First apply all display states
                            category.tasks.forEach(task => {
                                cookies.filter(cookie => cookie.namespace === task.id).forEach(cookie => {
                                    if (cookie.subname === "display") {
                                        task.setDisplay(cookie.value === "true");
                                    }
                                });
                            });

                            // Then apply all checked states without updating category
                            category.tasks.forEach(task => {
                                cookies.filter(cookie => cookie.namespace === task.id).forEach(cookie => {
                                    if (cookie.subname === "weekly" && interval.interval === "weekly") {
                                        task.setChecked(cookie.value === "true", interval, category, true);
                                    } else if (cookie.subname === "daily" && interval.interval === "daily") {
                                        task.setChecked(cookie.value === "true", interval, category, true);
                                    }
                                });
                            });

                            // Finally update category state once
                            const displayedTasks = category.tasks.filter(task => task.display);
                            const allDisplayedTasksChecked = displayedTasks.length > 0 && displayedTasks.every(task => task.checked);
                            category.open = !allDisplayedTasksChecked;
                        });
                    });
                });
            }
        }
    }
}

export class ResetInterval {
    readonly id: string;
    readonly interval: Interval;
    readonly timer: string;
    readonly tasks: string;
    readonly reset: string;
    readonly icon: string;
    categories = $state<ResetCategory[]>([]);
    time = $state(0);

    constructor(params: {
        id?: string;
        interval?: Interval;
        timer?: string;
        tasks?: string;
        reset?: string;
        icon?: string;
    } = {}) {
        this.id = params.id ?? "";
        this.interval = params.interval ?? Interval.daily;
        this.timer = params.timer ?? "";
        this.tasks = params.tasks ?? "";
        this.reset = params.reset ?? "";
        this.icon = params.icon ?? "";
    }
}

export class ResetCategory {
    readonly id: string;
    readonly name: string;
    open = $state(true);
    tasks = $state<ResetTask[]>([]);

    constructor(id: string = "", name: string = "") {
        this.id = id;
        this.name = name;
    }

    toggleOpen() {
        this.open = !this.open;
    }
}

export class ResetTask {
    readonly id: string;
    display = $state(false);
    checked = $state(false);
    readonly name: string;
    readonly icon: string;
    readonly link: string;
    readonly description?: string;
    readonly location?: string;
    readonly chatcode?: string;
    timer? = $state<ResetTimer>();

    constructor(params: {
        id?: string;
        name?: string;
        icon?: string;
        link?: string;
        description?: string;
        location?: string;
        chatcode?: string;
        display?: boolean;
    } = {}) {
        this.id = params.id ?? "";
        this.name = params.name ?? "";
        this.icon = params.icon ?? "";
        this.link = params.link ?? "";
        this.description = params.description;
        this.location = params.location;
        this.chatcode = params.chatcode;
        this.display = params.display ?? false;  // Initialize display from params
    }

    setDisplay(value: boolean) {
        this.display = value;
        setCookie(value, this.id, CookieType.display);
    }

    setChecked(value: boolean, interval: ResetInterval, category: ResetCategory, skipCategoryUpdate: boolean = false) {
        this.checked = value;

        if (!skipCategoryUpdate) {
            const displayedTasks = category.tasks.filter(task => task.display);
            const allDisplayedTasksChecked = displayedTasks.length > 0 && displayedTasks.every(task => task.checked);
            category.open = !allDisplayedTasksChecked;
        }

        setCookie(value, this.id, CookieType.checked, interval.interval);
    }
}

export class ResetTimer {
    duration = $state<[number, number]>([0, 0]);
    times = $state<[number, number, string?][]>([[0, 0]]);

    constructor(duration: [number, number] = [0, 0], times: [number, number, string?][] = [[0, 0]]) {
        this.duration = duration;
        this.times = times;
    }
}

export enum Interval {
    daily = "daily",
    weekly = "weekly"
}

enum CookieType { checked, display }

function getCookies(): Cookie[] {
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
