import {
	getUTCTimeForStartOfNextWeek,
	getUTCTimeForStartOfNextDay
} from '#lib/helpers/ResetFunctions.js';

interface ResetTimerData {
	duration: number[];
	times: (number | string)[][];
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

export interface ResetIntervalData {
	id: string;
	interval: string;
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

	constructor(data?: ResetIntervalData[], cookies: Cookie[] = []) {
		if (data) {
			const cookieValues: Record<string, string> = Object.fromEntries(
				cookies.map(({ namespace, subname, value }) => [`${namespace}.${subname}`, value])
			);

			this.intervals = data.map((interval) => {
				const resetInterval = new ResetInterval({
					id: interval.id,
					interval: parseInterval(interval.interval),
					timer: interval.timer,
					tasks: interval.tasks,
					reset: interval.reset,
					icon: interval.icon
				});

				resetInterval.categories = interval.categories.map((category: ResetCategoryData) => {
					const resetCategory = new ResetCategory(category.id, category.name); // Create tasks with clean state to avoid any state sharing
					resetCategory.tasks = category.tasks.map((task: ResetTaskData) => {
						const resetTask = new ResetTask({
							id: task.id,
							name: task.name,
							icon: task.icon,
							link: task.link,
							description: task.description,
							location: task.location,
							chatcode: task.chatcode,
							display: task.display ?? false,
							timer: task.timer ? createResetTimer(task.timer) : undefined
						});
						return resetTask;
					});
					return resetCategory;
				});
				return resetInterval;
			});

			this.intervals.forEach((interval) => {
				interval.categories.forEach((category) => {
					category.tasks.forEach((task) => {
						const displayValue = cookieValues[`${task.id}.display`];
						if (displayValue !== undefined) {
							task.display = displayValue === 'true';
						}

						const checkedValue = cookieValues[`${task.id}.${interval.interval}`];
						if (checkedValue !== undefined) {
							task.checked = checkedValue === 'true';
						}
					});

					category.syncOpenState();
				});
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

	constructor(
		params: {
			id?: string;
			interval?: Interval;
			timer?: string;
			tasks?: string;
			reset?: string;
			icon?: string;
		} = {}
	) {
		this.id = params.id ?? '';
		this.interval = params.interval ?? Interval.daily;
		this.timer = params.timer ?? '';
		this.tasks = params.tasks ?? '';
		this.reset = params.reset ?? '';
		this.icon = params.icon ?? '';
	}
}

export class ResetCategory {
	readonly id: string;
	readonly name: string;
	open = $state(true);
	tasks = $state<ResetTask[]>([]);

	constructor(id: string = '', name: string = '') {
		this.id = id;
		this.name = name;
	}

	toggleOpen() {
		// Toggle this category's expanded state.
		this.open = !this.open;
	}

	syncOpenState(openIncomplete = true) {
		// Collapse completed categories and optionally open incomplete ones.
		const displayedTasks = this.tasks.filter((task) => task.display);
		const allDisplayedTasksChecked =
			displayedTasks.length > 0 && displayedTasks.every((task) => task.checked);

		if (allDisplayedTasksChecked) {
			this.open = false;
		} else if (openIncomplete) {
			this.open = true;
		}
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
	readonly timer?: ResetTimer;

	constructor(
		params: {
			id?: string;
			name?: string;
			icon?: string;
			link?: string;
			description?: string;
			location?: string;
			chatcode?: string;
			display?: boolean;
			timer?: ResetTimer;
		} = {}
	) {
		this.id = params.id ?? '';
		this.name = params.name ?? '';
		this.icon = params.icon ?? '';
		this.link = params.link ?? '';
		this.description = params.description;
		this.location = params.location;
		this.chatcode = params.chatcode;
		this.display = params.display ?? false;
		this.timer = params.timer;
	}

	setDisplay(value: boolean) {
		// Save whether this task is shown.
		this.display = value;
		setCookie(value, this.id, CookieType.display);
	}

	setChecked(
		value: boolean,
		interval: ResetInterval,
		category: ResetCategory,
		skipCategoryUpdate: boolean = false
	) {
		// Update the check state and persist it until its reset.
		this.checked = value;

		if (!skipCategoryUpdate) category.syncOpenState();

		setCookie(value, this.id, CookieType.checked, interval.interval);
	}
}

export class ResetTimer {
	readonly duration: [number, number];
	readonly times: [number, number, string?][];

	constructor(duration: [number, number] = [0, 0], times: [number, number, string?][] = [[0, 0]]) {
		this.duration = duration;
		this.times = times;
	}
}

function createResetTimer(data: ResetTimerData): ResetTimer {
	// Validate timer data and create its typed model.
	const [durationHours, durationMinutes] = data.duration;
	if (
		data.duration.length !== 2 ||
		typeof durationHours !== 'number' ||
		typeof durationMinutes !== 'number' ||
		!Number.isFinite(durationHours) ||
		!Number.isFinite(durationMinutes)
	) {
		throw new Error('Invalid reset timer duration');
	}

	const times = data.times.map((time): [number, number, string?] => {
		const [hours, minutes, label] = time;
		if (
			typeof hours !== 'number' ||
			typeof minutes !== 'number' ||
			!Number.isFinite(hours) ||
			!Number.isFinite(minutes)
		) {
			throw new Error('Invalid reset timer time');
		}

		if (label === undefined) {
			return [hours, minutes];
		}
		if (typeof label !== 'string') {
			throw new Error('Invalid reset timer label');
		}
		return [hours, minutes, label];
	});

	return new ResetTimer([durationHours, durationMinutes], times);
}

export enum Interval {
	daily = 'daily',
	weekly = 'weekly'
}

function parseInterval(value: string): Interval {
	// Convert a reset interval string to its supported enum value.
	if (value === Interval.daily || value === Interval.weekly) {
		return value;
	}

	throw new Error(`Unsupported reset interval: ${value}`);
}

enum CookieType {
	checked,
	display
}

function setCookie(value: boolean, taskId: string, type: CookieType, interval?: Interval) {
	// Persist task preferences with the appropriate expiration time.
	if (typeof document === 'undefined') {
		return;
	}

	let time = new Date().getTime();
	let suffix: string = '';
	if (type === CookieType.display) {
		suffix = '.display';
		time += 365 * 24 * 60 * 60 * 1000;
	} else if (type === CookieType.checked) {
		switch (interval as Interval) {
			case Interval.weekly: {
				suffix = '.weekly';
				time = getUTCTimeForStartOfNextWeek().getTime();
				break;
			}
			case Interval.daily: {
				suffix = '.daily';
				time = getUTCTimeForStartOfNextDay().getTime();
				break;
			}
			default: {
				return;
			}
		}
	}
	const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? ';Secure' : '';
	document.cookie = `${taskId}${suffix}=${value};expires=${new Date(time).toUTCString()};path=/;SameSite=Lax${secure}`;
}
