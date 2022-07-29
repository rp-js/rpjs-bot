import { Event } from "../models";
import { EventType } from "../models/event.model";

const ready: Event = {
  name: "ready",
  type: EventType.once,
  function: () => {
    console.log(`Bot iniciado!`);
  },
};

export default ready;
