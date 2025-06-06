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
            const cookies = getCookies();
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
                    const resetCategory = new ResetCategory(category.id, category.name);

                    // Create tasks with clean state to avoid any state sharing
                    resetCategory.tasks = category.tasks.map((task: any) => {
                        const resetTask = new ResetTask({
                            id: task.id,
                            name: task.name,
                            icon: task.icon,
                            link: task.link,
                            description: task.description,
                            location: task.location,
                            chatcode: task.chatcode
                        });

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
                            resetTask.timer = new ResetTimer(task.timer.duration, task.timer.times);
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
    } = {}) {
        this.id = params.id ?? "";
        this.name = params.name ?? "";
        this.icon = params.icon ?? "";
        this.link = params.link ?? "";
        this.description = params.description;
        this.location = params.location;
        this.chatcode = params.chatcode;
    }

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
