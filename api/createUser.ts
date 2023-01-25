import ngrokURL from "../constants/ngrokURL";
import { NickUser, User } from "../types";

export default async function createUser(username: string): Promise<User> {
  const baseURL = ngrokURL;
  const createUserURL: string = `${baseURL}/users/create`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const res = await fetch(createUserURL, requestOptions);
    const resjson: NickUser = await res.json();
    const newUser: User = {
      id: resjson.id,
      username: resjson.username,
      createdAt: resjson.created_at,
    };
    if (newUser) {
      return newUser;
    } else throw new Error("user not created");
  } catch (err) {
    console.log(err);
    throw err;
  }
}
