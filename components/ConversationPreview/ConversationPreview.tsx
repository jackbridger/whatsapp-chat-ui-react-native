import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import {
  setCurrentConversation,
  markConversationAsRead,
} from "../../redux/conversationsReducer";
import { Conversation } from "../../types";
import styles from "./ConversationPreview.styles";
import images from "../../assets/index";
import getRandomProfilePicture from "../../helpers/getRandomProfilePicture";
import Colors from "../../constants/Colors";

interface ConversationPreviewProps {
  conversation: Conversation;
}

interface ChatRouteParams {
  conversation: Conversation;
}

export default function ConversationPreview(props: ConversationPreviewProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { conversation } = props;
  const hasMessage = conversation.messages.length > 0;
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const lastUpdateTime = hasMessage ? lastMessage.time : conversation.createdAt;
  const hasUnreadMessages = hasMessage && !lastMessage.isRead;

  const profileImg = images[conversation.randomProfilePicture];

  const chatRouteParams: ChatRouteParams = {
    conversation,
  };

  const _onPress = () => {
    if (hasUnreadMessages) {
      dispatch(markConversationAsRead(conversation));
    }
    dispatch(setCurrentConversation(conversation));
    navigation.navigate("Chat", chatRouteParams);
  };

  return (
    <TouchableOpacity onPress={_onPress} style={styles.messageContainer}>
      <View style={styles.imgAndMsgSubContainer}>
        <Image style={styles.profileImg} source={profileImg} />
        <View style={{ width: "100%" }}>
          <Text style={styles.msgTitle}>{conversation.name}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.msgPreview}
          >
            {hasMessage ? lastMessage.message : ""}
          </Text>
        </View>
      </View>
      <View style={styles.msgDataContainer}>
        <View style={styles.msgDataSubContainer}>
          <Text
            style={{
              color: hasUnreadMessages
                ? Colors.light.brightGreen
                : Colors.light.offBlack,
            }}
          >
            {dayjs(lastUpdateTime).format("HH:mm")}
          </Text>
          {hasUnreadMessages && (
            <View style={styles.numberOfMsgsContainer}>
              <Text style={styles.numberOfMsgsText}>1</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
