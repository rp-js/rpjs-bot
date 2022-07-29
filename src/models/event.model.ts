import { ClientEvents } from "discord.js";

export enum EventType {
  once = "once",
  on = "on",
}

export interface Event {
  name: keyof ClientEvents;
  type: EventType;
  function: Function;
}
