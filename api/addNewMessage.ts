import { Conversation, Message } from "../types";
import ngrokURL from "../constants/ngrokURL";

const baseURL = ngrokURL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export default async function addNewMessage(message: Message) {
  const addNewMessageURL: string = `${baseURL}/conversations/${message.conversationID}/messages/create`;

  const raw = JSON.stringify({
    user_id: message.userID,
    message: message.message,
  });
  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch(addNewMessageURL, requestOptions);
  const res1 = response.json();
  return res1;
}

// use /messages and pass in the channel_id and message