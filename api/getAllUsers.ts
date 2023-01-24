import { NickUser, User } from "../types";

export default async function (userID: string): Promise<User[]> {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const baseURL =
      "https://2082-2a02-c7c-365f-6600-605a-fab1-5972-2093.eu.ngrok.io";
    const getConversationsURL: string = `${baseURL}/users/search?user_id=${userID}&q=n`;
    const response = await fetch(getConversationsURL, requestOptions);
    const data = await response.json();
    const formattedData: User[] = data.map((user: NickUser) => {
      return {
        id: user.id,
        username: user.username,
        createdAt: user.created_at,
      };
    });
    return formattedData;
  } catch (err) {
    console.log(err);
    return [];
  }
}
