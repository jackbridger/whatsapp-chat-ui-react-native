import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Conversation } from "../../types";

import styles from "./ConversationPreview.styles";
interface ConversationPreviewProps {
  conversation: Conversation;
}

export default function ConversationPreview(props: ConversationPreviewProps) {
  const { conversation } = props;
  const navigation = useNavigation();
  const imgSrc = "../../assets/images/nickcage.jpeg";
  const _onPress = () => {
    navigation.navigate("Chat");
  };
  return (
    <TouchableOpacity onPress={_onPress} style={styles.messageContainer}>
      <View style={styles.imgAndMsgSubContainer}>
        <Image style={styles.profileImg} source={require(imgSrc)} />
        <View>
          <Text style={styles.msgTitle}>{conversation.title}</Text>
          <Text style={styles.msgPreview}>
            {conversation.messages[conversation.messages.length - 1].text}
          </Text>
        </View>
      </View>
      <View style={styles.msgDataContainer}>
        <View style={styles.msgDataSubContainer}>
          <Text style={styles.timeText}>9:29</Text>
          <View style={styles.numberOfMsgsContainer}>
            <Text style={styles.numberOfMsgsText}>2</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
