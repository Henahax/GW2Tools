export class Reset {
    intervals = $state<ResetInterval[]>([]);
}

export class ResetInterval {
    id = "";

    timer = "";
    tasks = "";
    reset = ""
    class = "";

    categories = $state<ResetCategory[]>([]);
}

export class ResetCategory {
    id = "";
    name = "";
    tasks = $state<ResetTask[]>([]);

    displayedTasksCount = $derived(getDispayedTasksCount(this.tasks));
}

export class ResetTask {
    id = "";
    display = false;

    isDone = false;

    name = "";
    icon = "";

    description? = "";
    location? = "";

    link = "";
    timers? = $state<ResetTimer>()
}

export class ResetTimer {
    duration = $state<[number, number]>([0, 0]);
    times = $state<[number, number][]>([[0, 0]])
}

function getDispayedTasksCount(tasks: ResetTask[]): number {
    return tasks.filter(task => task.display === true).length;
}
