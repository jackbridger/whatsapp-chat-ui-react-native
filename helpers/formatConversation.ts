import { Conversation, SupabaseConversation, Message } from "../types";

const randomIntBetweenOneAndFour = Math.floor(Math.random() * 5);

export default function formatConversation(
  conversationsResponse: SupabaseConversation
): Conversation {
  const messages = conversationsResponse.messages
    ? conversationsResponse.messages.map((msg) => {
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
    id: conversationsResponse.id,
    messages: messages ? messages : [],
    name: conversationsResponse.name,
    users: [conversationsResponse.owner_user_id],
    createdAt: conversationsResponse.created_at,
    randomProfilePicture: randomIntBetweenOneAndFour,
    participants: conversationsResponse.participants.map((user) => ({
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
    })),
  };
}
