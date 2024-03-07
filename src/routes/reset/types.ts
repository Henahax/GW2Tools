export interface TimeRemaining {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export interface Category {
	id: string;
	name: string;
	index: number;
	tasks: [Item[]];
}

export interface Item {
	id: string;
	name: string;
	category: string;
	interval: string;
	sort: number;
	icon: string;
	info: string;
	link: string;
	default?: boolean;
	timer?: {
		duration: [number, number];
		times: Array<[number, number, string?]>;
	};
}
