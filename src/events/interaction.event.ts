import { Interaction, CacheType } from "discord.js";
import { Event } from "../models";
import { EventType } from "../models/event.model";
import { collection } from "../server";

async function onInteraction(interaction: Interaction<CacheType>) {
  if (!interaction.isChatInputCommand()) return;

  const command = collection.get(interaction.commandName) as Function;
  if (!command) return;

  try {
    await command(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "deu erro aqui.", ephemeral: true });
  }
}

const interaction: Event = {
  name: "interactionCreate",
  type: EventType.on,
  function: onInteraction,
};

export default interaction;
