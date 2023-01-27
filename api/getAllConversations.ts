import { MyResponse } from "../types";
import formatConversations from "../helpers/formatConversations";
import ngrokURL from "../constants/ngrokURL";

const requestOptions: RequestInit = {
  method: "GET",
  redirect: "follow",
};

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
