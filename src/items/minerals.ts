import type { Misc } from "../storage/types";

export const STONE = {
    id: "stone",
    name: "Stone",
    description: "A piece of stone",
    type: "misc",
} as const satisfies Misc;

export const COAL = {
    id: "coal",
    name: "Coal",
    description: "A piece of coal, it's black",
    type: "misc",
} as const satisfies Misc;

export const IRON = {
    id: "iron",
    name: "Iron",
    description: "A piece of iron",
    type: "misc",
} as const satisfies Misc;

export const GOLD = {
    id: "gold",
    name: "Gold",
    description: "A shiny piece of gold",
    type: "misc",
} as const satisfies Misc;

export const DIAMOND = {
    id: "diamond",
    name: "Diamond",
    description: "A shiny piece of diamond",
    type: "misc",
} as const satisfies Misc;

export const EMERALD = {
    id: "emerald",
    name: "Emerald",
    description: "A shiny piece of emerald",
    type: "misc",
} as const satisfies Misc;

export const RUBY = {
    id: "ruby",
    name: "Ruby",
    description: "A shiny piece of ruby",
    type: "misc",
} as const satisfies Misc;

export const Minerals = [STONE, COAL, IRON, GOLD, DIAMOND, EMERALD, RUBY] as const;
