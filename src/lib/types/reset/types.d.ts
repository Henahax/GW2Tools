export type Interval = {
	id: string;
	timer: string;
	tasks: string;
	reset: string;
	class: string;
	categories: Category[];
};

export type Category = {
	id: string;
	name: string;
	index: number;
	tasks: Task[];
};

export type Task = {
	id: string;
	category: string;
	name: string;
	interval: daily | weekly;
	icon: string;
	description?: string;
	link: string;
	location?: string;
	display?: boolean;
	timer?: Timer;
	checked?: boolean;
};

export type Timer = {
	duration: [number, number];
	times: [number, number][];
};
