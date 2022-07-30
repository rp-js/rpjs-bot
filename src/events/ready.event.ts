import { Event, EventType } from "../models";
import { reactionRoles } from "../utils/reaction";

const ready: Event = {
  name: "ready",
  type: EventType.once,
  function: () => {
    console.log(`Bot iniciado!`);

    initResourses();
  },
};

function initResourses() {
  reactionRoles();
}

export default ready;
