import { View, ImageBackground, Text } from "react-native";
import { useState, useContext } from "react";
import { RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";

import SendButton from "../../components/SendButton/SendButton";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import { Conversation } from "../../types";
import { RootState } from "../../redux/store";

import styles from "./Chat.styles";
interface ChatProps {
  route: RouteProp<
    {
      params: {
        conversation: Conversation;
      };
    },
    "params"
  >;
}

export default function Chat(props: ChatProps) {
  const conversation = useSelector(
    (state: RootState) => state.conversations.currentConversation
  );
  const messages = conversation ? conversation.messages : [];

  const whatsappBackgroundImg = "../../assets/images/whatsapp.png";
  const [isTyping, setIsTyping] = useState(false);
  const [heightOfMessageBox, setHeightOfMessageBox] = useState(0);

  return conversation ? (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require(whatsappBackgroundImg)}
        resizeMode="cover"
      >
        <ChatMessages
          heightOfMessageBox={heightOfMessageBox}
          messages={messages}
        />
        <SendButton
          setIsTyping={setIsTyping}
          isTyping={isTyping}
          setHeightOfMessageBox={setHeightOfMessageBox}
          heightOfMessageBox={heightOfMessageBox}
          thisConversation={conversation}
        />
      </ImageBackground>
    </View>
  ) : (
    <Text>Loading</Text>
  );
}
