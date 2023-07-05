import { Minerals } from "./minerals";
import { Weapons } from "./weapons";
import { Armors } from "./armors";

export const Items = [...Minerals, ...Weapons, ...Armors] as const;

export * from "./minerals";
export * from "./weapons";
export * from "./armors";
