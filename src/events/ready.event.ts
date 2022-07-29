import { Client, TextChannel } from "discord.js";
import { Event } from "../models";
import { EventType } from "../models/event.model";
import { reactionRoles } from "../utils/reaction";

const ready: Event = {
  name: "ready",
  type: EventType.once,
  function: (client: Client) => {
    console.log(`Bot iniciado!`);

    initResourses(client);
  },
};

function initResourses(client: Client) {
  reactionRoles(client);
}

export default ready;
