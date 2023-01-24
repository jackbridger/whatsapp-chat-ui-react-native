import { Conversation, NickConversation, Message } from "../types";
export default function formatConversation(
  conversationsResponse: NickConversation
): Conversation {
  console.log("conversationsResponse");
  console.log(conversationsResponse);
  const messages = conversationsResponse.messages
    ? conversationsResponse.messages.map((msg) => {
        const formattedMessage: Message = {
          id: msg.id,
          message: msg.message,
          time: msg.created_at,
          userID: msg.users.id,
          conversationID: msg.conversation_id,
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
  };
}
