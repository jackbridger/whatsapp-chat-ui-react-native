import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { MyResponse } from "../types";
import formatConversations from "../helpers/formatConversations";
import ngrokURL from "../constants/ngrokURL";


export default async function getAllConversations(
  userID: string
): Promise<MyResponse> {
  try {
    const channels = await getAllChannels()
    return {
      data: channels,
      status: 200,
      message: "success",
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


const getAllChannels = async () => {
  const token = useSelector((state: RootState) => state.users.token);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions:RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
    const res = await fetch("http://api.supersimplechat.com/channels/", requestOptions)
    const json:    {
      id:string,
      name:string,
      owner_user_id:string,
      created_at:string
      updated_at:string
  }[] = await res.json()
    return json
  }catch(err){
    console.log(err);
    return []
  }
}