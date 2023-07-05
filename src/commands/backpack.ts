import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { InteractionModule } from "../types";
import { users } from "../storage";

const module: InteractionModule<ChatInputCommandInteraction> = {
    data: new SlashCommandBuilder().setName("backpack").setDescription("Show your backpack"),
    async execute(client, interaction) {
        if (!client.user) {
            await interaction.reply({
                content: "I don't know who I am.",
                ephemeral: true,
            });
            return;
        }

        const u = users();
        const user = u[interaction.user.id];

        const embed = new EmbedBuilder()
            .setTitle("Your backpack")
            .setDescription(`You have ${user.backpack.items.length} items in your backpack.`)
            .addFields(
                ...user.backpack.items.map((item) => ({
                    name: item.name,
                    value: item.description,
                }))
            );

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

export const data = module.data;
export const execute = module.execute;
