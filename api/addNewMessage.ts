import { Conversation, Message } from "../types";

const baseURL =
  "https://6d6b-2a02-c7c-365f-6600-605a-fab1-5972-2093.eu.ngrok.io";

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
