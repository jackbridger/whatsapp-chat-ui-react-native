import { View } from "react-native";
import Dialog from "react-native-dialog";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/usersReducer";
import { User } from "../../types";
import createUser from "../../api/createUser";
import Navigation from "../../navigation";

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
    console.log("Create user with username: " + username);
    const user: User = await createUser(username);
    dispatch(setCurrentUser(user));
    setShowUserDialog(false);
  };
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Set username</Dialog.Title>
        <Dialog.Input
          label="username"
          onChangeText={(_username: string) => setUsername(_username)}
        ></Dialog.Input>
        <Dialog.Button label="Create new user" onPress={_createUser} />
      </Dialog.Container>
    </View>
  );
}
