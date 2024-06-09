export interface TimeRemaining {
	days?: string;
	hours?: string;
	minutes?: string;
	seconds?: string;
}

export interface Category {
	id: string;
	name: string;
	index: number;
	tasks: Task[];
}

export interface Task {
	id: string;
	name: string;
	category: string;
	interval: string;
	sort: number;
	icon: string;
	info: string;
	link: string;
	display: boolean;
	checked: boolean;
	alarm?: boolean;
	timer?: {
		duration: [number, number];
		times: Array<[number, number, string?]>;
	};
}
