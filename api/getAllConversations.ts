import { Conversation, Message } from "../types";

const requestOptions: RequestInit = {
  method: "GET",
  redirect: "follow",
};
interface NickConversation {
  id: string;
  name: string;
  messages: NickMessage[];
  owner_user_id: string;
  created_at: string;
}

interface NickMessage {
  id: string;
  conversation_id: string;
  users: {
    id: string;
    username: string;
  };
  message: string;
  created_at: string;
}

interface MyResponse {
  data: Conversation[] | null;
  status: number;
  message: string;
}

const baseURL =
  "https://6d6b-2a02-c7c-365f-6600-605a-fab1-5972-2093.eu.ngrok.io";

const userID = "7e1903aa-0839-445e-b041-8325bae7900f";
const getconversationsURL: string = `${baseURL}/conversations?user_id=${userID}`;

const formatConversations = (conversationsResponse: NickConversation[]) => {
  const conversations: Conversation[] = conversationsResponse.map((conv) => {
    const messages = conv.messages.map((msg) => {
      const formattedMessage: Message = {
        id: msg.id,
        message: msg.message,
        time: msg.created_at,
        userID: msg.users.id,
        conversationID: msg.conversation_id,
      };
      return formattedMessage;
    });
    return {
      id: conv.id,
      messages: messages ? messages : [],
      name: conv.name,
      users: [conv.owner_user_id],
      createdAt: conv.created_at,
    };
  });
  return conversations;
};

export default async function getAllConversations(): Promise<MyResponse> {
  try {
    const response = await fetch(getconversationsURL, requestOptions);
    const result_1 = await response.json();
    const formattedConversations = formatConversations(result_1);
    return {
      data: formattedConversations,
      status: response.status,
      message: response.statusText,
    };
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    return {
      data: null,
      status: 400,
      message,
    };
  }
}
