import { Message, TextChannel } from "discord.js";
import { client } from "..";
import { MessageModel, ReactionMessageModel, ReactionModel } from "../models";
import { setReactionMessage } from "./firebase";

export const messagesReactions: string[] = [];

export async function reactionRoles(data: ReactionMessageModel) {
  if (!data.sended) {
    const messageData = await createReactionMessage(
      data.message,
      data.reactions
    );

    if (!messageData) return;

    const message: MessageModel = {
      ...data.message,
      messageId: messageData.id,
    };

    setReactionMessage({
      ...data,
      message: message,
      sended: true,
    });
    return;
  }

  const guilds = await client.guilds.cache.get(data.message.guildId);
  const channel = guilds?.channels.cache.get(
    data.message.channelId
  ) as TextChannel;

  try {
    await channel.messages.fetch(data.message.messageId);
  } catch (error) {
    console.log(error);
  }

  const message = await channel.messages.cache.get(data.message.messageId);

  if (!message) return;

  await message.reactions.removeAll();

  await verifyReactions(message, data.reactions);
}

export async function createReactionMessage(
  messageData: MessageModel,
  reactions: ReactionModel[]
) {
  try {
    const message = await sendMessage(messageData);

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

/**
 * verifica se as reações estão na menssagem
 */
export async function verifyReactions(
  message: Message,
  reactions: ReactionModel[]
) {
  await Promise.all(
    reactions.map(async (reaction) => {
      const react = message.reactions.cache.find(
        (react) => react.emoji.name === reaction.name
      );

      if (!react) {
        await reactMessage(reaction, message);
      } else {
        console.log("testando");
      }
    })
  );

  return true;
}

export async function sendMessage(messageData: MessageModel) {
  const channel = client.channels.cache.get(
    messageData.channelId
  ) as TextChannel;

  if (!channel) {
    throw new Error("o canal escolhido não existe");
  }

  const message = await channel.send(messageData.messageText);

  if (!message) {
    throw new Error(`Menssagem "${messageData.messageText}", não enviada`);
  }

  return message;
}

/**
 * Reage uma menssagem com um emoji do servidor
 */
export async function reactMessage(reaction: ReactionModel, message: Message) {
  const emoji = client.emojis.cache.find(
    (emoji) => emoji.name === reaction.name
  );

  if (!emoji) return;

  try {
    await message.react(emoji);
  } catch (error) {
    console.log(error);
  }
}
