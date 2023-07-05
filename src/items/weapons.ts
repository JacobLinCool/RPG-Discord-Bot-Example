import type { Weapon } from "../storage/types";

export const WOODEN_SWORD = {
    id: "wooden_sword",
    name: "Wooden Sword",
    description: "A wooden sword",
    type: "weapon",
    damage: 10,
} as const satisfies Weapon;

export const IRON_SWORD = {
    id: "iron_sword",
    name: "Iron Sword",
    description: "An iron sword",
    type: "weapon",
    damage: 20,
} as const satisfies Weapon;

export const DIAMOND_SWORD = {
    id: "diamond_sword",
    name: "Diamond Sword",
    description: "A diamond sword",
    type: "weapon",
    damage: 30,
} as const satisfies Weapon;

export const Weapons = [WOODEN_SWORD, IRON_SWORD, DIAMOND_SWORD] as const;
