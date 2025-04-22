export class Reset {
    intervals = $state<ResetInterval[]>([]);

    constructor(data?: any[]) {
        if (data) {
            this.intervals = data.map(interval => {
                let resetInterval = Object.assign(new ResetInterval(), interval);
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

    timer = "";
    tasks = "";
    reset = ""
    icon = "";

    categories = $state<ResetCategory[]>([]);
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

    // todo : false
    display = $state(true);

    checked = $state(false);

    name = "";
    icon = "";

    description? = "";
    location? = "";

    link = "";
    timers? = $state<ResetTimer>()

    setChecked(value: boolean) {
        this.checked = value;
    }

    setDisplay(value: boolean) {
        this.display = value;
    }
}

export class ResetTimer {
    duration = $state<[number, number]>([0, 0]);
    times = $state<[number, number][]>([[0, 0]])
}

export function getUTCTimeForStartOfNextDay() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);

    return tomorrow;
}
