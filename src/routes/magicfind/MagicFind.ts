export class MagicFind {
    value: number = 0;
    categories: MagicFindCategory[] = [];
}

export class MagicFindCategory {
    description: string = "";
    items: MagicFindItem[] = [];
}

export class MagicFindItem {
    icons: string[] = [];
    names: [{ name: string, link: string }] = [{ name: "", link: "" }];
    description: string = "";
}

export class MagicFindItemNumber extends MagicFindItem {
    value: number = 0;

    setValue(newValue: number): void {
        this.value = newValue;
    }
}

export class MagicFindItemBool extends MagicFindItem {
    value: number = 0;
    checked: boolean = false;

    setChecked(newChecked: boolean): void {
        this.checked = newChecked;
    }
}

export class MagicFindItemSelect extends MagicFindItem {
    value: number = 0;

    options: [{ value: number, description: string }] = [{ value: 0, description: "" }];
    selected: number = 0;

    setSelected(newSelected: number): void {
        this.selected = newSelected;
    }
}
