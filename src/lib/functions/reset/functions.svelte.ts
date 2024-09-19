import type { Task } from '$lib/types/reset/types';

export function getUTCTimeForStartOfNextDay() {
	const now = new Date();
	const tomorrow = new Date(now);
	tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
	tomorrow.setUTCHours(0, 0, 0, 0);

	return tomorrow;
}

export function getUTCTimeForStartOfNextWeek() {
	const now = new Date();
	var nextMonday = new Date();

	while (nextMonday.getUTCDay() !== 1) {
		nextMonday.setUTCDate(nextMonday.getUTCDate() + 1);
	}

	nextMonday.setUTCHours(7, 30, 0, 0);
	if (nextMonday < now) {
		nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);
	}
	return nextMonday;
}

export function setCookie(task: Task, isSetting = false) {
	let time = new Date().getTime();
	let suffix: string;
	let value: boolean;
	if (isSetting) {
		value = Boolean(task.display);
		suffix = '.display';
		time += 365 * 24 * 60 * 60 * 1000;
	} else {
		value = Boolean(task.checked);
		suffix = '.checked';
		switch (task.interval) {
			case 'daily': {
				time = getUTCTimeForStartOfNextDay().getTime();
				break;
			}
			case 'weekly': {
				time = getUTCTimeForStartOfNextWeek().getTime();
				break;
			}
			default: {
				return;
			}
		}
	}
	document.cookie =
		task.id + suffix + '=' + value + ';expires=' + new Date(time).toUTCString() + ';path=/';
}
