export interface Item {
	id: string;
	category: string;
	type: 'number' | 'checkbox' | 'select';
	value: number;
	icons: string[];
	names: ItemName[];
	description: string;
	checked?: boolean; // Optional, since it's not always present
	options?: ItemOption[]; // Optional, only for "select" type
}

interface ItemOption {
	value: number;
	description: string;
}

interface ItemName {
	name: string;
	link: string;
}
