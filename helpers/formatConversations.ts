import { Conversation, NickConversation, Message } from "../types";

const randomIntBetweenOneAndFour = Math.floor(Math.random() * 5);

export default function formatConversations(
  conversationsResponse: NickConversation[]
): Conversation[] {
  const conversations: Conversation[] = conversationsResponse.map((conv) => {
    const messages = conv.messages
      ? conv.messages.map((msg) => {
          const formattedMessage: Message = {
            id: msg.id,
            message: msg.message,
            time: msg.created_at,
            userID: msg.users.id,
            conversationID: msg.conversation_id,
            isRead: false,
          };
          return formattedMessage;
        })
      : [];
    return {
      id: conv.id,
      messages: messages ? messages : [],
      name: conv.name,
      users: [conv.owner_user_id],
      createdAt: conv.created_at,
      randomProfilePicture: randomIntBetweenOneAndFour,
    };
  });
  return conversations;
}
