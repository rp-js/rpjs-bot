import { database } from "firebase-admin";
import { client } from "..";
import { ReactionMessageModel } from "../models";
import { messagesReactions, reactionRoles } from "./menssages";

export async function setReactionMessage(data: ReactionMessageModel) {
  const { guildId } = data.message;
  const db = database();

  db.ref(`servers/${guildId}/reaction-roles`).set(data);
}

export async function reactionRolesStart() {
  const db = database();

  client.guilds.cache.forEach((guild) => {
    const reference = db.ref(`servers/${guild.id}/reaction-roles`);

    reference.on("value", async (snapshot) => {
      const data: ReactionMessageModel = snapshot.val();

      if (data.active) {
        reactionRoles(data);
        messagesReactions.push(data.message.messageId);
      }
    });
  });
}
