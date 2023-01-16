import { MessageType } from "../types";

export default function formatMessage(
  msg: string,
  userID: number
): MessageType {
  return {
    id: `${Math.random()}`,
    text: msg,
    userID: userID,
    time: new Date(),
  };
}
