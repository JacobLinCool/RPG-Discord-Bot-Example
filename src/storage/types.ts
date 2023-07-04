export interface User {
    id: string;
    balance: number;
    exp: number;
    backpack: Backpack;
}

export interface Backpack {
    size: number;
    items: Item[];
}

export type ItemType = "weapon" | "armor" | "consumable" | "misc";

export interface Item {
    id: string;
    name: string;
    description: string;
    type: ItemType;
}

export interface Weapon extends Item {
    type: "weapon";
    damage: number;
}

export interface Armor extends Item {
    type: "armor";
    defense: number;
}

export interface Consumable extends Item {
    type: "consumable";
    effect: string;
}

export interface Misc extends Item {
    type: "misc";
}
