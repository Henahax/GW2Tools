export class MagicFind {
    categories = $state<MagicFindCategory[]>([]);

    get total(): number {
        let total = 0;
        for (const category of this.categories) {
            for (const item of category.items) {
                if (item instanceof MagicFindItemNumber) {
                    total += item.value;
                } else if (item instanceof MagicFindItemBool) {
                    total += item.checked ? item.value : 0;
                } else if (item instanceof MagicFindItemRadio) {
                    total += item.checked ? item.value : 0;
                } else if (item instanceof MagicFindItemSelect) {
                    total += item.selected;
                }
            }
        }
        return total;
    }
}

export class MagicFindCategory {
    id = "";
    description = "";
    items = $state<MagicFindItem[]>([]);

    setCheckedRadio(): void {
        this.items.forEach((item) => {
            if (item instanceof MagicFindItemRadio) {
                item.checked = false;
            }
        });
    }
}

export class MagicFindItem {
    id = "";
    value = $state(0);
    description = "";
    icons: string[] = [];
    names: [{ name: string, link: string }] = [{ name: "", link: "" }];
}

export class MagicFindItemNumber extends MagicFindItem {
    setValue(newValue: number): void {
        this.value = newValue;
    }
}

export class MagicFindItemBool extends MagicFindItem {
    checked = $state(false);

    setChecked(newChecked: boolean): void {
        this.checked = newChecked;
    }
}

export class MagicFindItemRadio extends MagicFindItem {
    checked = $state(false);

    setChecked(newChecked: boolean, category: MagicFindCategory): void {
        category.setCheckedRadio();
        this.checked = newChecked;
    }
}

export class MagicFindItemSelect extends MagicFindItem {
    options: [{ value: number, description: string }] = [{ value: 0, description: "" }];
    selected = $state(0);

    setSelected(newSelected: number): void {
        this.selected = newSelected;
    }
}