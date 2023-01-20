import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentConversation } from "../../redux/reducers/conversationsReducer";

import { ConversationType } from "../../types";
import styles from "./ConversationPreview.styles";
// import { ConversationsContext } from "../../context/conversationContext";
import images from "../../assets/index";

interface ConversationPreviewProps {
  conversation: ConversationType;
}

interface ChatRouteParams {
  conversation: ConversationType;
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
    dispatch(setCurrentConversation(conversation.id));
    navigation.navigate("Chat", chatRouteParams);
  };

  return (
    <TouchableOpacity onPress={_onPress} style={styles.messageContainer}>
      <View style={styles.imgAndMsgSubContainer}>
        <Image style={styles.profileImg} source={profileImg} />
        <View>
          <Text style={styles.msgTitle}>{conversation.title}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.msgPreview}
          >
            {conversation.messages[conversation.messages.length - 1].text}
          </Text>
        </View>
      </View>
      <View style={styles.msgDataContainer}>
        <View style={styles.msgDataSubContainer}>
          <Text style={styles.timeText}>
            {dayjs(
              conversation.messages[conversation.messages.length - 1].time
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
