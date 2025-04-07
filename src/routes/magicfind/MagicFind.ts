export class MagicFind {
    value: number = 0;
    categories: MagicFindCategory[] = [];
}

export class MagicFindCategory {
    name: string = ""
    description: string = "";
    items: MagicFindItem[] = [];
}

export class MagicFindItem {
    value: number = 0;
    description: string = "";
    icons: string[] = [];
    names: [{ name: string, link: string }] = [{ name: "", link: "" }];
}

export class MagicFindItemNumber extends MagicFindItem {

    setValue(newValue: number): void {
        this.value = newValue;
    }
}

export class MagicFindItemBool extends MagicFindItem {
    checked: boolean = false;

    setChecked(newChecked: boolean): void {
        this.checked = newChecked;
    }
}

export class MagicFindItemRadio extends MagicFindItem {
    checked: boolean = false;
    name: string = ""

    setChecked(newChecked: boolean): void {
        this.checked = newChecked;
    }
}

export class MagicFindItemSelect extends MagicFindItem {

    options: [{ value: number, description: string }] = [{ value: 0, description: "" }];
    selected: number = 0;

    setSelected(newSelected: number): void {
        this.selected = newSelected;
    }
}
