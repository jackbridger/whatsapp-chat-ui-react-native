import { Conversation, Message } from "../types";

const baseURL =
  "https://8e5b-2a02-c7c-365f-6600-f4cc-f2f8-f217-17b2.eu.ngrok.io";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export default async function addNewMessage(message: Message) {
  const addNewMessageURL: string = `${baseURL}/conversations/${message.conversationID}/messages/create`;
  console.log("message.userID");
  console.log(message.userID);

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
