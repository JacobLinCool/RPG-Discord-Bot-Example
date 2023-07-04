import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { InteractionModule } from "../types";
import { users } from "../storage";

const module: InteractionModule<ChatInputCommandInteraction> = {
    data: new SlashCommandBuilder().setName("stat").setDescription("Show my state"),
    async execute(client, interaction) {
        const u = users();
        const user = u[interaction.user.id];

        const embed = new EmbedBuilder()
            .setTitle("Your state")
            .addFields(
                { name: "Level", value: Math.floor(user.exp / 100).toString() },
                { name: "Exp", value: (user.exp % 100).toString() },
                { name: "Balance", value: user.balance.toString() }
            );

        await interaction.reply({ embeds: [embed] });
    },
};

export const data = module.data;
export const execute = module.execute;
