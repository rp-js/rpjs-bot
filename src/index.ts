import initializeFirebase from "../firebase/admin";
import { config } from "dotenv";
import { commandsDeploy } from "./commands-deploy";
import { configBotCommands, configBotEvents } from "./server";
import { Client, GatewayIntentBits } from "discord.js";

config();

initializeFirebase();
commandsDeploy();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
});

configBotEvents(client);
configBotCommands();

client.login(process.env.TOKEN);
