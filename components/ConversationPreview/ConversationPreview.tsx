import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import { setCurrentConversation } from "../../redux/conversationsReducer";
import { Conversation } from "../../types";
import styles from "./ConversationPreview.styles";
import images from "../../assets/index";

interface ConversationPreviewProps {
  conversation: Conversation;
}

interface ChatRouteParams {
  conversation: Conversation;
}

export default function ConversationPreview(props: ConversationPreviewProps) {
  const { conversation } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileImg = images[conversation.id];

  const chatRouteParams: ChatRouteParams = {
    conversation,
  };

  const _onPress = () => {
    dispatch(setCurrentConversation(conversation));
    navigation.navigate("Chat", chatRouteParams);
  };

  return (
    <TouchableOpacity onPress={_onPress} style={styles.messageContainer}>
      <View style={styles.imgAndMsgSubContainer}>
        <Image style={styles.profileImg} source={profileImg} />
        <View>
          <Text style={styles.msgTitle}>{conversation.name}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.msgPreview}
          >
            {conversation.messages.length > 0
              ? conversation.messages[conversation.messages.length - 1].message
              : ""}
          </Text>
        </View>
      </View>
      <View style={styles.msgDataContainer}>
        <View style={styles.msgDataSubContainer}>
          <Text style={styles.timeText}>
            {dayjs(
              conversation.messages.length > 1
                ? conversation.messages[conversation.messages.length - 1].time
                : conversation.createdAt
            ).format("HH:mm")}
          </Text>
          <View style={styles.numberOfMsgsContainer}>
            <Text style={styles.numberOfMsgsText}>2</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
