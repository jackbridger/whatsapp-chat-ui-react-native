import { View, ImageBackground } from "react-native";
import { useState, useContext } from "react";
import { RouteProp } from "@react-navigation/native";

import SendButton from "../../components/SendButton/SendButton";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import { ConversationType } from "../../types";
import { ConversationsContext } from "../../context/conversationContext";
import styles from "./Chat.styles";
interface ChatProps {
  route: RouteProp<
    {
      params: {
        conversation: ConversationType;
      };
    },
    "params"
  >;
}

export default function Chat(props: ChatProps) {
  const { conversation } = props.route.params;
  const { getCurrentConversation } = useContext(ConversationsContext);
  const { messages } = getCurrentConversation();

  const whatsappBackgroundImg = "../../assets/images/whatsapp.png";
  const [isTyping, setIsTyping] = useState(false);
  const [heightOfMessageBox, setHeightOfMessageBox] = useState(0);

  return (
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
  );
}
