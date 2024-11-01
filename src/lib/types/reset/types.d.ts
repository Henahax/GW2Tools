export type Interval = {
	readonly id: string;
	timer: string;
	tasks: string;
	reset: string;
	class: string;
	categories: Category[];
};

export type Category = {
	readonly id: string;
	readonly name: string;
	readonly index: number;
	tasks: Task[];
};

export type Task = {
	readonly id: string;
	readonly category: string;
	readonly name: string;
	readonly interval: daily | weekly;
	readonly icon: string;
	readonly description?: string;
	readonly link: string;
	readonly location?: string;
	display?: boolean;
	timer?: Timer;
	checked?: boolean;
};

export type Timer = {
	duration: [number, number];
	times: [number, number][];
};
