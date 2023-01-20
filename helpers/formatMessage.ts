import { MessageType } from "../types";

export default function formatMessage(
  msg: string,
  userID: number,
  conversationID: string
): MessageType {
  return {
    id: `${Math.random()}`,
    text: msg,
    userID: userID,
    time: new Date().toString(),
    conversationID: conversationID,
  };
}
