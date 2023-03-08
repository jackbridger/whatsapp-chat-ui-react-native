import { View } from "react-native";
import Dialog from "react-native-dialog";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setCurrentUser,setToken } from "../../redux/usersReducer";
import { User } from "../../types";
import createToken from "../../api/createToken";

export default function CreateUserDialog({
  visible,
  setShowUserDialog,
}: {
  visible: boolean;
  setShowUserDialog: (vis: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");

  const _createUser = async () => {
    const token: string = await createToken(username);
    console.log("token ",token)
    const user:User = {
      id:username,
      username:username,
      createdAt: new Date().toDateString() // need to update
    }
    dispatch(setToken(token));
    dispatch(setCurrentUser(user));
    setShowUserDialog(false);
  };
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Set name</Dialog.Title>
        <Dialog.Input
          label="username"
          onChangeText={(_username: string) => setUsername(_username)}
        ></Dialog.Input>
        <Dialog.Button label="Create new user" onPress={_createUser} />
      </Dialog.Container>
    </View>
  );
}
