import { Event, EventType } from "../models";
import { reactionRolesStart } from "../utils/firebase";

const ready: Event = {
  name: "ready",
  type: EventType.once,
  function: () => {
    console.log(`Bot iniciado!`);

    initResourses();
  },
};

function initResourses() {
  reactionRolesStart();
}

export default ready;
