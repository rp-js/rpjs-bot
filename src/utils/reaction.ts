import { Client, TextChannel } from "discord.js";
import { database } from "firebase-admin";
import { ReactionConfig } from "../models";

const db = database();

export async function reactionRoles(client: Client) {
  client.guilds.cache.forEach((guild) => {
    sendMessages(client, guild.id);
  });

  client.emojis.cache.forEach((emoji) => {
    console.log(emoji);
  });
}

function sendMessages(client: Client, guildId: string) {
  db.ref(`servers/${guildId}/reaction-roles`).on("value", (snapshot) => {
    const data: ReactionConfig = snapshot.val();

    if (data.activate) {
      sendMessage(data, client, guildId);
    }
  });
}

async function sendMessage(
  reactionConfig: ReactionConfig,
  client: Client,
  guildId: string
) {
  if (!reactionConfig.activate || reactionConfig.sended) return;

  const channel = client.channels.cache.get(
    reactionConfig.channel
  ) as TextChannel;

  if (!channel) {
    console.error("o canal escolhido não existe");
    return;
  }

  const message = await channel.send(reactionConfig.message);

  db.ref(`servers/${guildId}/reaction-roles`).set({
    ...reactionConfig,
    messageId: message.id,
    sended: true,
  });
}
