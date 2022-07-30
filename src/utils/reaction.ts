import { Client, Message, TextChannel } from "discord.js";
import { database } from "firebase-admin";
import { client } from "..";

const db = database();

export async function reactionRoles() {
  const message = await sendMessage("1002309210148712470", "teste menssagem");

  if (!message) return;

  reactMessage("testando", message);
}

async function sendMessage(channelId: string, messageString: string) {
  const channel = client.channels.cache.get(channelId) as TextChannel;

  if (!channel) {
    throw new Error("o canal escolhido não existe");
  }

  const message = await channel.send(messageString);

  return message;
}

async function reactMessage(emojiName: string, message: Message) {
  const emoji = client.emojis.cache.find((emoji) => emoji.name === emojiName);

  if (!emoji) return;

  message.react(emoji);
}
