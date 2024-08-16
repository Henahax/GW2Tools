import taskList from './tasks.json';
import categories from './categories.json';
import type { Task } from './types';

let tasks: Task[] = taskList as Task[];

export function load({ cookies }) {
	function applyCookies(tasks: Task[]) {
		tasks.forEach((task) => {
			let display = cookies.get(task.id + '.display');
			if (display) {
				task.display = display.toLowerCase() === 'true';
			}

			let checked = cookies.get(task.id + '.checked');
			if (checked) {
				task.checked = checked.toLowerCase() === 'true';
			}
		});
		return tasks;
	}

	return {
		categories: categories,
		tasks: applyCookies(tasks)
	};
}
