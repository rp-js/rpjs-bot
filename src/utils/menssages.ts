import { Message, TextChannel } from "discord.js";
import { client } from "..";

export async function reactionRoles() {
  const message = await sendMessage("1002309210148712470", "teste menssagem");

  if (!message) return;

  await reactMessage("testando", message);
}

export async function sendMessage(channelId: string, messageString: string) {
  const channel = client.channels.cache.get(channelId) as TextChannel;

  if (!channel) {
    throw new Error("o canal escolhido não existe");
  }

  const message = await channel.send(messageString);

  return message;
}

export async function reactMessage(emojiName: string, message: Message) {
  const emoji = client.emojis.cache.find((emoji) => emoji.name === emojiName);

  if (!emoji) {
    message.react(emojiName);
    return;
  }

  try {
    await message.react(emoji);
  } catch (error) {
    console.log(error);
  }
}
