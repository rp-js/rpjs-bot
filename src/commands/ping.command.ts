import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import { Command } from "../models";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");

const ping: Command = {
  data,
  function: (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    interaction.reply("pong!");
  },
};

export default ping;
