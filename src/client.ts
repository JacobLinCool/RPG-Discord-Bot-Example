import { Client, Events, GatewayIntentBits } from "discord.js";

export const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});
