import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { useDispatch } from "react-redux";

import { setCurrentConversation } from "../../redux/conversationsReducer";
import { Conversation } from "../../types";
import styles from "./UserPreview.styles";
import images from "../../assets/index";
import { User } from "../../types";

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

  //   const chatRouteParams: ChatRouteParams = {
  //     conversation,
  //   };

  const _onPress = () => {
    // dispatch(setCurrentConversation(conversation));
    // navigation.navigate("Chat", chatRouteParams);
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
