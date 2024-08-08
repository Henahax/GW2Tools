export class MagicfindCategory {
	id: string;
	name: string;
	items: MagicfindItem[];

	constructor(id: string, name: string, items: MagicfindItem[]) {
		this.id = id;
		this.name = name;
		this.items = items;
	}
}

export class MagicfindItem {
	private _value: number;
	private _checked?: boolean;

	id: string;
	type: 'number' | 'checkbox' | 'select';
	icons: string[];
	names: MagicfindItemName[];
	description: string;
	options?: [number, string][]; // Optional since it only applies to select type

	constructor(
		id: string,
		type: 'number' | 'checkbox' | 'select',
		value: number,
		icons: string[],
		names: MagicfindItemName[],
		description: string,
		checked?: boolean,
		options?: [number, string][]
	) {
		this.id = id;
		this.type = type;
		this._value = value;
		this.icons = icons;
		this.names = names;
		this.description = description;
		this._checked = checked;
		this.options = options;
	}

	get value(): number {
		return this._value;
	}

	set value(newValue: number) {
		if (newValue >= 0) {
			this._value = newValue;
		} else {
			throw new Error('Value must be a non-negative number');
		}
	}

	get checked(): boolean | undefined {
		return this._checked;
	}

	set checked(newChecked: boolean | undefined) {
		if (this.type === 'checkbox') {
			this._checked = newChecked;
		} else {
			throw new Error('Checked property is only applicable for checkbox type');
		}
	}
}

export class MagicfindItemName {
	name: string;
	link: string;

	constructor(name: string, link: string) {
		this.name = name;
		this.link = link;
	}
}
