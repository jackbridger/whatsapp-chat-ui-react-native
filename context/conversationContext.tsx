import { createContext, useState } from "react";

import { ConversationType, ConversationsContextType } from "../types";
import startingConversations from "../data/startingConversations";
import formatMessage from "../helpers/formatMessages";

export const ConversationsContext = createContext<ConversationsContextType>({
  conversations: startingConversations,
  sendMessage: () => {},
  getCurrentConversation: () => {
    return { id: "", messages: [], users: [], title: "" };
  },
  setCurrentConversation: (id) => {},
});

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState<ConversationType[]>(
    sortConversations(startingConversations)
  );
  const [currConversation, setCurrConversation] = useState<ConversationType>();

  const getCurrentConversation = () => {
    if (currConversation) return currConversation;
    else return { id: "", messages: [], users: [], title: "" };
  };

  const setCurrentConversation = (id: string) => {
    const currentConvo = conversations.filter((conv) => conv.id === id)[0];
    setCurrConversation(currentConvo);
  };

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
      if (currConversation && currConversation.id === thisConversationID) {
        setCurrConversation((prevConvo: ConversationType) => {
          return {
            ...prevConvo,
            messages: [...prevConvo.messages, formatMessage(newMsg, userID)],
          };
        });
      }
      setConversations((previousConversations: ConversationType[]) => {
        const allConversations = previousConversations.map(
          (conversation: ConversationType) => {
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
          }
        );
        return sortConversations(allConversations);
      });
    }
  }
  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        sendMessage,
        getCurrentConversation,
        setCurrentConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

const sortConversations = (conversations: ConversationType[]) => {
  return conversations.sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];
    return lastMessageB.time.getTime() - lastMessageA.time.getTime();
  });
};
