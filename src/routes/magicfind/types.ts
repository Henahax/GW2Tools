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