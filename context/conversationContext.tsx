import { createContext, useState } from "react";

import { ConversationType, ConversationsContextType } from "../types";
import startingConversations from "../data/startingConversations";
import formatMessage from "../helpers/formatMessages";

export const ConversationsContext = createContext<ConversationsContextType>({
  conversations: startingConversations,
  sendMessage: () => {},
  getCurrentConversation: (id) => {
    return { id: "", messages: [], users: [], title: "" };
  },
});

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState<ConversationType[]>(
    startingConversations
  );

  const getCurrentConversation = (thisConversationID: string) =>
    conversations.filter((conv) => conv.id === thisConversationID)[0];

  function sendMessage(
    newMsg: string,
    thisConversationID: string,
    userID: number,
    setNewMsg: (msg: string) => void,
    isTyping: boolean,
    setIsTyping: (isTyping: boolean) => void
  ) {
    if (isTyping) {
      setNewMsg("");
      setIsTyping(false);
      setConversations((previousConversations: ConversationType[]) => {
        return previousConversations.map((conversation: ConversationType) => {
          if (conversation.id === thisConversationID) {
            return {
              ...conversation,
              messages: [
                ...conversation.messages,
                formatMessage(newMsg, userID),
              ],
            };
          }
          return conversation;
        });
      });
    }
  }
  return (
    <ConversationsContext.Provider
      value={{ conversations, sendMessage, getCurrentConversation }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
