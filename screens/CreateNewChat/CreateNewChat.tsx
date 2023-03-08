import { View } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";

import styles from "./CreateNewChat.styles";
import getAllUsers from "../../api/getAllUsers";
import { addAllUsers } from "../../redux/usersReducer";
import { User } from "../../types";
import { RootState } from "../../redux/store";
import Colors from "../../constants/Colors";
import UserPreview from "../../components/UserPreview/UserPreview";

const renderUser = (props: { item: User }) => {
  const { item } = props;
  return <UserPreview user={item} />;
};

export default function CreateNewChat() {
  const allUsers = useSelector((state: RootState) => state.users.users);
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      getAllUsers().then((users) => {
        dispatch(addAllUsers(users));
      });
    }
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.light.white,
        height: "100%",
        paddingTop: "3%",
      }}
    >
      {allUsers.length > 0 && (
        <FlashList
          estimatedItemSize={30}
          data={allUsers}
          renderItem={renderUser}
        />
      )}
    </View>
  );
}
