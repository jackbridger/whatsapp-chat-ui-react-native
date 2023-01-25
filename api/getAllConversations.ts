import { Conversation, Message } from "../types";
import formatConversations from "../helpers/formatConversations";
import ngrokURL from "../constants/ngrokURL";

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

const baseURL = ngrokURL;

export default async function getAllConversations(
  userID: string
): Promise<MyResponse> {
  try {
    const getconversationsURL: string = `${baseURL}/conversations?user_id=${userID}`;
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
