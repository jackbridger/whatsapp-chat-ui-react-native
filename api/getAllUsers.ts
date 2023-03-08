import { useSelector } from "react-redux";
import { SupabaseUser, User } from "../types";
import ngrokURL from "../constants/ngrokURL";
import { RootState } from "../redux/store";


export default async function (): Promise<User[]> {
  try {
    const users = await getAllUsers()
    const formattedData: User[] = users.map((user: {display_name:string,id:string}) => {
      return {
        id: user.id,
        username: user.display_name,
        createdAt: new Date().toString(), // to update
      };
    });

    return formattedData;
  } catch (err) {
    console.log(err);
    return [];
  }
}

const getAllUsers =  async () => {
  const token = useSelector((state: RootState) => state.users.token);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions:RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };
  try{
    const res = await fetch("http://api.supersimplechat.com/users/", requestOptions)
    const users = await res.json()
    return users
  }catch(err){
    return []
  }
  
}
