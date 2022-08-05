import initializeFirebase from "../firebase/admin";
import { config } from "dotenv";
import { commandsDeploy } from "./commands-deploy";
import { configBotCommands, configBotEvents } from "./server";
import { Client, GatewayIntentBits } from "discord.js";
import { database } from "firebase-admin";

config();

initializeFirebase();

export const db = database();

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
