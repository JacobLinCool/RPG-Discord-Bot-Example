import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { InteractionModule } from "../types";
import { get, users } from "../storage";
import { Minerals, STONE, COAL, IRON, GOLD, DIAMOND, EMERALD } from "../items";

const COOLDOWN = 5_000;

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

        if (diff >= COOLDOWN) {
            status[client.user.id] = {
                ...status[client.user.id],
                last: now,
            };

            const count = Math.floor(Math.random() * 40) + 10;

            let special: (typeof Minerals)[number] = STONE;
            let rand = Math.random();
            if (rand < 0.02) {
                special = EMERALD;
            } else if (rand < 0.05) {
                special = DIAMOND;
            } else if (rand < 0.1) {
                special = GOLD;
            } else if (rand < 0.2) {
                special = IRON;
            } else if (rand < 0.5) {
                special = COAL;
            }

            const u = users();
            const user = u[interaction.user.id];

            user.exp += count + (special !== STONE ? 100 : 0);
            if (special !== STONE && user.backpack.items.length < user.backpack.size) {
                user.backpack.items.push(special);
            }

            u[interaction.user.id] = user;

            const embed = new EmbedBuilder()
                .setTitle("You mined some stones!")
                .setDescription(`You mined ${count} stones.`)
                .addFields({
                    name: special !== STONE ? "You are lucky!" : "No luck this time.",
                    value: special !== STONE ? `You also mined a ${special.name}!!` : "You didn't mine anything special.",
                });

            await interaction.reply({ embeds: [embed] });
        } else {
            const left = Math.ceil((COOLDOWN - diff) / 1000);
            const embed = new EmbedBuilder().setTitle("You can't mine yet!").setDescription(`You need to wait ${left} seconds.`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};

export const data = module.data;
export const execute = module.execute;
