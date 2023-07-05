import { Items } from "../items";

/**
 * user -> system
 */
export const BUY_IN: Record<(typeof Items)[number]["id"], number> = {
    stone: 1,
    coal: 2,
    iron: 5,
    gold: 20,
    diamond: 50,
    emerald: 100,
    ruby: 100,
    wooden_sword: 10,
    iron_sword: 40,
    diamond_sword: 80,
    leather_armor: 10,
    iron_armor: 40,
    diamond_armor: 80,
};

/**
 * system -> user
 */
export const SELL_OUT: Record<(typeof Items)[number]["id"], number> = {
    stone: 4,
    coal: 8,
    iron: 20,
    gold: 80,
    diamond: 200,
    emerald: 400,
    ruby: 400,
    wooden_sword: 40,
    iron_sword: 160,
    diamond_sword: 320,
    leather_armor: 40,
    iron_armor: 160,
    diamond_armor: 320,
};
