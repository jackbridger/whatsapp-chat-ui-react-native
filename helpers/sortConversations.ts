import { Conversation } from "../types";
import dayjs from "dayjs";

const sortConversations = (conversations: Conversation[]): Conversation[] => {
  if (conversations.length <= 1) {
    return conversations;
  }
  const sortedConversations = conversations
    .slice()
    .sort((a: Conversation, b: Conversation): number => {
      const lastMessageA = a.messages[a.messages.length - 1];

      const lastMessageB = b.messages[b.messages.length - 1];
      return dayjs(
        lastMessageB && lastMessageB.time ? lastMessageB.time : b.createdAt
      ).isAfter(
        lastMessageA && lastMessageA.time ? lastMessageA.time : a.createdAt
      )
        ? 1
        : -1;
    });
  return sortedConversations;
};

export default sortConversations;
