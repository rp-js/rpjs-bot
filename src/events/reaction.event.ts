import { MessageReaction, User } from "discord.js";
import { db } from "..";
import { Event, EventType, ReactionMessageModel } from "../models";
import { messagesReactions } from "../utils";

const verifyMessage = (reaction: MessageReaction, user: User) => {
  if (!reaction.me) {
    const { guildId } = reaction.message;

    const reference = db.ref(`servers/${guildId}/reaction-roles`);

    reference.on("value", (snapshot) => {
      const data: ReactionMessageModel = snapshot.val();
      awaitReaction(reaction, user, data);
    });

    reference.off();
  }
};

async function awaitReaction(
  reaction: MessageReaction,
  user: User,
  data: ReactionMessageModel
) {
  await Promise.all(
    messagesReactions.map(async (message) => {
      if (message === reaction.message.id) {
        const guild = user.client.guilds.cache.get(data.message.guildId);
        if (!guild) return;

        const reactionRole = data.reactions.filter((role) => {
          return role.name === reaction.emoji.name;
        })[0];

        const role = guild.roles.cache.find(
          (role) => role.name === reactionRole.role
        );

        const member = guild.members.cache.get(user.id);

        if (!role || !member) return;

        member.roles.add(role);
      }
    })
  );
}

const reactionCreate: Event = {
  name: "messageReactionAdd",
  type: EventType.on,
  function: verifyMessage,
};

export default reactionCreate;
