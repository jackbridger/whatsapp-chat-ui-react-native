import { Conversation, Message } from "../types";
import formatConversations from "../helpers/formatConversations";

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
  "https://2082-2a02-c7c-365f-6600-605a-fab1-5972-2093.eu.ngrok.io";

const userID = "bf6e83b9-926c-4dbd-bf26-5f88118e887f";
const getconversationsURL: string = `${baseURL}/conversations?user_id=${userID}`;

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
