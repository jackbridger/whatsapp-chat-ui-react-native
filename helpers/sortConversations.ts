import { ConversationType } from "../types";
import dayjs from "dayjs";

const sortConversations = (
  conversations: ConversationType[]
): ConversationType[] => {
  const sortedConversations = conversations
    .slice()
    .sort((a: ConversationType, b: ConversationType): number => {
      const lastMessageA = a.messages[a.messages.length - 1];
      const lastMessageB = b.messages[b.messages.length - 1];
      return dayjs(lastMessageB.time).isAfter(lastMessageA.time) ? 1 : -1;
    });
  return sortedConversations;
};

export default sortConversations;
