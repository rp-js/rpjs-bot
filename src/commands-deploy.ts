import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { config } from "dotenv";
import { join } from "path";
import { readdirSync } from "fs";
import { Command } from "./models";
config();

export function commandsDeploy() {
  const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

  if (!CLIENT_ID || !GUILD_ID || !TOKEN) {
    throw new Error("Variaveis de ambientes não configuradas.");
  }

  const commands = [];
  const commandsPath = join(__dirname, "commands");
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".command.ts")
  );

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const commandModel = require(filePath);

    const command = commandModel.default as Command;

    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(TOKEN);

  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}
