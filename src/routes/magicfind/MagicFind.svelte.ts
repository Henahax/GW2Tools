export class MagicFind {
    categories = $state<MagicFindCategory[]>([]);

    constructor(data?: any[]) {
        if (data) {
            this.categories = data.map(seedCategory => {
                const category = new MagicFindCategory();
                category.id = seedCategory.id;
                category.name = seedCategory.name;

                category.items = seedCategory.items.map(seedItem => {
                    if (seedItem.type === 'number') {
                        const item = new MagicFindItemNumber();
                        item.description = seedItem.description || '';
                        item.value = typeof seedItem.value === 'string' ? parseInt(seedItem.value) : seedItem.value || 0;
                        item.icons = seedItem.icons || [];
                        item.names = [{ name: seedItem.names?.[0]?.name || '', link: seedItem.names?.[0]?.link || '' }];
                        return item;
                    } else if (seedItem.type === 'select') {
                        const item = new MagicFindItemSelect();
                        item.description = seedItem.description;
                        item.icons = seedItem.icons || [];
                        item.names = [{ name: seedItem.names?.[0]?.name || '', link: seedItem.names?.[0]?.link || '' }];
                        item.options = seedItem.options.map((option: { value: number; description: string }) => {
                            return { value: option.value, description: option.description };
                        });
                        return item;
                    } else if (seedItem.type === 'bool') {
                        const item = new MagicFindItemBool();
                        item.description = seedItem.description || '';
                        item.value = typeof seedItem.value === 'string' ? parseInt(seedItem.value) : seedItem.value || 0;
                        item.icons = seedItem.icons || [];
                        item.names = [{ name: seedItem.names?.[0]?.name || '', link: seedItem.names?.[0]?.link || '' }];
                        const boolItem = seedItem as { checked?: boolean };
                        item.checked = !!boolItem.checked;
                        return item;
                    } else if (seedItem.type === 'radio') {
                        const item = new MagicFindItemRadio();
                        item.description = seedItem.description || '';
                        item.value = typeof seedItem.value === 'string' ? parseInt(seedItem.value) : seedItem.value || 0;
                        item.icons = seedItem.icons || [];
                        item.names = [{ name: seedItem.names?.[0]?.name || '', link: seedItem.names?.[0]?.link || '' }];
                        const radioItem = seedItem as { checked?: boolean };
                        item.checked = !!radioItem.checked;
                        return item;
                    }
                    return new MagicFindItem(); // fallback
                });

                return category;
            });
        }
    }

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
    name = "";
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