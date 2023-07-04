import fs from "node:fs";
import path from "node:path";
import { User } from "./types";
import debug from "../log";

const log = debug("storage");

const root = path.resolve("data");

if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
}

export function get<V extends unknown = unknown>(key: string, init: (prop: string) => V): Record<string, V> {
    const file = path.join(root, `${key}.json`);
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify({}));
    }

    const raw = JSON.parse(fs.readFileSync(file, "utf-8"));

    return new Proxy(raw, {
        set: (target, prop, value) => {
            target[prop] = value;
            fs.writeFileSync(file, JSON.stringify(raw, null, 4));
            log(`Updated ${key} ${prop.toString()}`);
            return true;
        },
        get: (target, prop) => {
            return target[prop] ?? init(prop.toString());
        },
    });
}

export function users(): Record<string, User> {
    return get("users", (prop) => ({
        id: prop,
        balance: 0,
        exp: 0,
        backpack: {
            size: 10,
            items: [],
        },
    }));
}
