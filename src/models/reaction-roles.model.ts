export interface ReactionMessageModel {
  sended: boolean;
  active: boolean;
  message: MessageModel;
  reactions: ReactionModel[];
}

export interface MessageModel {
  guildId: string;
  channelId: string;
  messageId: string;
  messageText: string;
}

export interface ReactionModel {
  name: string;
  role: string;
}
