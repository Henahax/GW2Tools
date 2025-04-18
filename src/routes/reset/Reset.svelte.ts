export class Reset {
    intervals = $state<ResetInterval[]>([]);
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
    display = false;

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
}

export class ResetTimer {
    duration = $state<[number, number]>([0, 0]);
    times = $state<[number, number][]>([[0, 0]])
}
