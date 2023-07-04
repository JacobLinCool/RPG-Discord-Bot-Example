import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { InteractionModule } from "../types";
import { get, users } from "../storage";

const module: InteractionModule<ChatInputCommandInteraction> = {
    data: new SlashCommandBuilder().setName("mine").setDescription("Mine some stones"),
    async execute(client, interaction) {
        if (!client.user) {
            await interaction.reply({
                content: "I don't know who I am.",
                ephemeral: true,
            });
            return;
        }

        const status = get("mine", (id) => ({
            id,
            last: 0,
        }));

        const now = Date.now();
        const diff = now - status[client.user.id].last;

        if (diff >= 10_000) {
            status[client.user.id] = {
                ...status[client.user.id],
                last: now,
            };

            const count = Math.floor(Math.random() * 40) + 10;

            const u = users();
            const old = u[interaction.user.id];
            u[interaction.user.id] = {
                ...old,
                exp: old.exp + count,
            };

            const embed = new EmbedBuilder().setTitle("You mined some stones!").setDescription(`You mined ${count} stones.`);

            await interaction.reply({ embeds: [embed] });
        } else {
            const left = Math.ceil((10_000 - diff) / 1000);
            const embed = new EmbedBuilder().setTitle("You can't mine yet!").setDescription(`You need to wait ${left} seconds.`);

            await interaction.reply({ embeds: [embed] });
        }
    },
};

export const data = module.data;
export const execute = module.execute;
