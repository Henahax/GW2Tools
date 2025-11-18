export class MagicFind {
    categories = $state<MagicFindCategory[]>([]);

    constructor(data?: MagicFindCategory[]) {
        if (data) {
            this.categories = data.map(seedCategory => {
                const category = Object.assign(new MagicFindCategory(), {
                    id: seedCategory.id,
                    name: seedCategory.name
                });

                category.items = seedCategory.items.map((seedItem: MagicFindItem | MagicFindItemNumber | MagicFindItemBool | MagicFindItemRadio | MagicFindItemSelect) => {
                    let item: MagicFindItem;

                    switch (seedItem.type) {
                        case 'number':
                            item = Object.assign(new MagicFindItemNumber(), seedItem);
                            break;
                        case 'select':
                            item = Object.assign(new MagicFindItemSelect(), seedItem);
                            break;
                        case 'bool':
                            item = Object.assign(new MagicFindItemBool(), seedItem);
                            break;
                        case 'radio':
                            item = Object.assign(new MagicFindItemRadio(), seedItem);
                            break;
                        default:
                            item = Object.assign(new MagicFindItem(), seedItem);
                    }
                    return item;
                });
                return category;
            });
        }
    }

    get total(): number {
        return this.categories.reduce((total, category) => {
            return total + category.items.reduce((categoryTotal, item) => {
                if (item instanceof MagicFindItemNumber) {
                    return categoryTotal + (item.value * (item.multiplier ?? 1));
                } else if (item instanceof MagicFindItemBool && item.checked) {
                    return categoryTotal + item.value;
                } else if (item instanceof MagicFindItemRadio && item.checked) {
                    return categoryTotal + (typeof item.value === 'string' ? parseInt(item.value) : item.value);
                } else if (item instanceof MagicFindItemSelect) {
                    return categoryTotal + item.selected;
                }
                return categoryTotal;
            }, 0);
        }, 0);
    }
}

export class MagicFindCategory {
    id = "";
    name = "";
    open = $state(true);
    items = $state<MagicFindItem[]>([]);

    toggleOpen() {
        this.open = !this.open;
    }

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
    type = "bool";
    icons: string[] = [];
    names: [{ name: string, link: string }] = [{ name: "", link: "" }];
}

export class MagicFindItemNumber extends MagicFindItem {
    multiplier = 1;
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
    options: { value: number, description: string }[] = [{ value: 0, description: "" }];
    selected = $state(0);

    setSelected(newSelected: number): void {
        this.selected = newSelected;
    }
}