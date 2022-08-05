import { Message, TextChannel } from "discord.js";
import { client } from "..";

export async function reactionRoles() {
  const messageText = "reage aí";
  const reactions: string[] = ["teste", "testando"];

  const guilds = await client.guilds.cache.get("1002309209699917894");
  const channel = guilds?.channels.cache.get(
    "1002309210148712470"
  ) as TextChannel;

  await channel.messages.fetch("1004958653222223872");

  const message = await channel.messages.cache.get("1004958653222223872");

  if (!message) return;

  await message.reactions.removeAll();

  const sended = true;

  if (!sended) {
    createReactionMessage("1002309210148712470", messageText, reactions);
    return;
  }

  verifyReactions(message, reactions);
}

export async function createReactionMessage(
  channelId: string,
  messageText: string,
  reactions: string[]
) {
  try {
    const message = await sendMessage(channelId, messageText);

    await Promise.all(
      reactions.map(async (reaction) => {
        await reactMessage(reaction, message);
      })
    );

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function verifyReactions(
  message: Message,
  reactionsName: string[]
) {
  await Promise.all(
    reactionsName.map(async (reactionName) => {
      if (
        !message.reactions.cache.find(
          (react) => react.emoji.name === reactionName
        )
      ) {
        await reactMessage(reactionName, message);
      }
    })
  );

  return true;
}

export async function sendMessage(channelId: string, messageText: string) {
  const channel = client.channels.cache.get(channelId) as TextChannel;

  if (!channel) {
    throw new Error("o canal escolhido não existe");
  }

  const message = await channel.send(messageText);

  if (!message) {
    throw new Error(`Menssagem "${messageText}", não enviada`);
  }

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
