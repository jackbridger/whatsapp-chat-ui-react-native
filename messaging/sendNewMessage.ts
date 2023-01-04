import { Message } from "../types";

function sendNewMessage(text: string, userID: number) {
  const message: Message = {
    text,
    time: new Date().toISOString(),
    userID,
  };
  //   insert message into firestore messages table
}
