import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } from "discord.js";
import type { InteractionModule } from "../types";
import { users } from "../storage";
import { BUY_IN } from "../market";
import { Item } from "../storage/types";

const module: InteractionModule<ChatInputCommandInteraction> = {
    data: new SlashCommandBuilder().setName("sell").setDescription("Sell an item from your backpack"),
    async execute(client, interaction) {
        if (!client.user || !interaction.channel) {
            await interaction.reply({
                content: "I don't know who I am.",
                ephemeral: true,
            });
            return;
        }

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id,
            time: 3 * 60_000,
        });

        collector.on("collect", async (i) => {
            if (i.customId.startsWith("sell:")) {
                const id = i.customId.split(":")[1];

                const u = users();
                const user = u[interaction.user.id];
                const item = user.backpack.items.find((item) => item.id === id);

                if (!item) {
                    await i.reply({ content: "You don't have this item in your backpack.", ephemeral: true });
                    return;
                }

                const embed = new EmbedBuilder().setTitle("Item sold!").setDescription(`You sold ${item.name} for ${BUY_IN[item.id]} coins.`);

                user.backpack.items = user.backpack.items.filter((i) => i !== item);
                user.balance += BUY_IN[item.id];
                u[interaction.user.id] = user;

                await i.reply({ embeds: [embed] });
            }
        });

        collector.on("end", async (collected) => {
            if (collected.size === 0) {
                await interaction.editReply({ content: "Timed out. You didn't sell anything." });
            } else {
                await interaction.editReply({ content: "Time's up! Use `/sell` to sell more items." });
            }
        });

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

        const rows: ActionRowBuilder<ButtonBuilder>[] = [];

        const map = new Map<Item["id"], Item>();
        for (const item of user.backpack.items) {
            map.set(item.id, item);
        }
        const items = [...map.values()];
        map;
        for (let i = 0; i < items.length; i += 5) {
            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                ...items
                    .slice(i, i + 5)
                    .map((item) =>
                        new ButtonBuilder()
                            .setCustomId(`sell:${item.id}`)
                            .setLabel(`${item.name} ($${BUY_IN[item.id]})`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji("💰")
                    )
            );
            rows.push(row);
        }

        await interaction.reply({ embeds: [embed], components: rows, ephemeral: true });
    },
};

export const data = module.data;
export const execute = module.execute;
