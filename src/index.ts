import { Client, GatewayIntentBits, Interaction, CacheType } from "discord.js";
import { config } from "dotenv";
config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log("Ready!");
});

const functions = {
  ping: () => "pong!",
  server: (interaction: Interaction<CacheType>) => {
    return `Nome do servidor: ${interaction.guild?.name} \nNúmero de membros: ${interaction.guild?.memberCount}`;
  },

  user: (interaction: Interaction<CacheType>) => {
    return `Sua tag: ${interaction.user.tag} \nSeu Id: ${interaction.user.id}`;
  },
};

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  interaction.reply(functions[commandName](interaction));
});

client.login(process.env.TOKEN);
