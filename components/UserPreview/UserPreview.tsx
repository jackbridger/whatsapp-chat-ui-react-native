import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewConversation,
  setCurrentConversation,
} from "../../redux/conversationsReducer";

import styles from "./UserPreview.styles";
import { User, Conversation } from "../../types";
import createConversation from "../../api/createConversation";
import formatConversation from "../../helpers/formatConversation";
import images from "../../assets/index";
import { RootState } from "../../redux/store";

interface UserPreviewProps {
  user: User;
}

interface ChatRouteParams {
  conversation: Conversation;
}

export default function UserPreview(props: UserPreviewProps) {
  const { user } = props;
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileImg = images[0];

  const _onPress = () => {
    if (currentUser) {
      const newGroupName = `${user.username} & ${currentUser.username}`;
      createConversation([user.id, currentUser.id], newGroupName, user.id)
        .then((conversation) => {
          const formattedConversation = formatConversation(conversation);

          dispatch(setCurrentConversation(formattedConversation));
          dispatch(addNewConversation(formattedConversation));

          navigation.dispatch((state) => {
            const routes = state.routes.filter(
              (r) => r.name !== "CreateNewChat"
            );
            const chatRoute = {
              name: "Chat",
              params: { conversation: formattedConversation },
              path: undefined,
            };
            const newRoutes = [...routes, chatRoute];
            return CommonActions.reset({
              ...state,
              routes: newRoutes,
              index: newRoutes.length - 1,
            });
          });

          // navigation.navigate("Chat", { conversation: formattedConversation });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <TouchableOpacity onPress={_onPress} style={styles.messageContainer}>
      <View style={styles.imgAndMsgSubContainer}>
        <Image style={styles.profileImg} source={profileImg} />
        <View>
          <Text style={styles.msgTitle}>{user.username}</Text>
          <Text style={styles.msgSubTitle}>Available</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
