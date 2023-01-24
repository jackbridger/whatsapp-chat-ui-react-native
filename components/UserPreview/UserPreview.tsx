import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { useDispatch } from "react-redux";

import {
  addNewConversation,
  setCurrentConversation,
} from "../../redux/conversationsReducer";

import styles from "./UserPreview.styles";
import images from "../../assets/index";
import { User, Conversation, NickConversation } from "../../types";
import createConversation from "../../api/createConversation";
import formatConversation from "../../helpers/formatConversation";

interface UserPreviewProps {
  user: User;
}

interface ChatRouteParams {
  conversation: Conversation;
}

export default function UserPreview(props: UserPreviewProps) {
  const { user } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileImg = images["blank"];

  const _onPress = () => {
    const userID = "bf6e83b9-926c-4dbd-bf26-5f88118e887f";
    createConversation([user.id, userID], user.username, user.id).then(
      (conversation) => {
        const formattedConversation = formatConversation(conversation);
        dispatch(setCurrentConversation(formattedConversation));
        dispatch(addNewConversation(formattedConversation));
        navigation.navigate("Chat", { conversation: formattedConversation });
      }
    );
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
