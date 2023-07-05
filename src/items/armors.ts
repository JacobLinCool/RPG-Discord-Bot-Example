import type { Armor } from "../storage/types";

export const LEATHER_ARMOR = {
    id: "leather_armor",
    name: "Leather Armor",
    description: "A leather armor",
    type: "armor",
    defense: 10,
} as const satisfies Armor;

export const IRON_ARMOR = {
    id: "iron_armor",
    name: "Iron Armor",
    description: "An iron armor",
    type: "armor",
    defense: 20,
} as const satisfies Armor;

export const DIAMOND_ARMOR = {
    id: "diamond_armor",
    name: "Diamond Armor",
    description: "A diamond armor",
    type: "armor",
    defense: 30,
} as const satisfies Armor;

export const Armors = [LEATHER_ARMOR, IRON_ARMOR, DIAMOND_ARMOR] as const;
