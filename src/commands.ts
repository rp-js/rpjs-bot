import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { config } from "dotenv";
config();

export function createCommands() {
  const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

  if (!CLIENT_ID || !GUILD_ID || !TOKEN) {
    return;
  }

  const commands = [
    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with pong!"),
    new SlashCommandBuilder()
      .setName("server")
      .setDescription("Replies with server info!"),
    new SlashCommandBuilder()
      .setName("user")
      .setDescription("Replies with user info!"),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: "10" }).setToken(TOKEN);

  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}
