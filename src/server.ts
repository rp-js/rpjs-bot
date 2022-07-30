import { Client, Collection, GatewayIntentBits } from "discord.js";
import { join } from "path";
import { readdirSync } from "fs";
import { Command, Event, EventType } from "./models";

export const collection = new Collection();

export function configBotEvents(client: Client) {
  const eventsPath = join(__dirname, "events");
  const eventFiles = readdirSync(eventsPath).filter((file) =>
    file.includes(".event.ts")
  );

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const eventModel = require(filePath);

    const event: Event = eventModel.default;

    if (event.type === EventType.on) {
      client.on(event.name, (...args) => event.function(...args));
    } else {
      client.once(event.name, (...args) => event.function(...args));
    }
  }
}

export function configBotCommands() {
  const commandsPath = join(__dirname, "commands");
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.includes(".command.ts")
  );

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const commandModel = require(filePath);

    const command: Command = commandModel.default;
    const commandName = file.replace(".command.ts", "");

    if (!command) {
      throw new Error(
        `Por favor, verifique se você exportou o comando ${commandName}`
      );
    }

    collection.set(command.data.name, command.function);
  }
}
