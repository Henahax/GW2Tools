/*
export type MagicFindData = {
	data: MagicFindCategory[];
};

export type MagicFindCategory = {
	id: string;
	name: string;
	items: MagicFindItem[];
};

export type MagicFindItem = {
	id: string;
	type: MagicFindItemType;
	value: number;
	icons: string[];
	names: MagicFindItemName[];
	description: string;
	checked: boolean;
};

type MagicFindItemName = {
	name: string;
	link: string;
};

enum MagicFindItemType {
	number,
	checkbox,
	select
}
*/

//

export interface MagicFindData {
	categories: MagicFindCategory[];
}

export interface MagicFindCategory {
	id: string;
	name: string;
	items: MagicFindItem[];
}

export interface MagicFindItem {
	id: string;
	type: 'number' | 'checkbox' | 'select';
	value: number;
	icons: string[];
	names: MagicFindName[];
	description: string;
	checked?: boolean;
	options?: [number, string][];
}

export interface MagicFindName {
	name: string;
	link: string;
}
