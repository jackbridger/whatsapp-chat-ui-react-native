import { Message } from "../types";

export default function formatMessage(
  msg: string,
  userID: string,
  conversationID: string
): Message {
  return {
    id: `${Math.random()}`,
    message: msg,
    userID: userID,
    time: new Date().toString(),
    conversationID: conversationID,
  };
}
