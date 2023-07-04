import { config } from "dotenv";

config();

export const TOKEN = process.env.TOKEN || "";
if (!TOKEN) {
    throw new Error("No token provided");
}

export const ID = process.env.ID || "";
if (!ID) {
    throw new Error("No ID provided");
}
