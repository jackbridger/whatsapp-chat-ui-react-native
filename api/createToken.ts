import ngrokURL from "../constants/ngrokURL";
import { SupabaseUser, User } from "../types";

export default async function createToken(username: string): Promise<string> {
  const baseURL = ngrokURL;

  const createTokenURL: string = `${baseURL}/user-token`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    user_id:username,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const res = await fetch(createTokenURL, requestOptions);
    const token: string = await res.text();
    if (token) {
      return token;
    } else throw new Error("token not created");
  } catch (err) {
    console.log(err);
    throw err;
  }
}
