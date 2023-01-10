import { View, ImageBackground } from "react-native";
import { useState } from "react";

import SendButton from "../../components/SendButton/SendButton";
import ChatMessages from "../../components/ChatMessages/ChatMessages";

import styles from "./Chat.styles";

export default function Chat() {
  const whatsappBackgroundImg = "../../assets/images/whatsapp.png";
  const [isTyping, setIsTyping] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require(whatsappBackgroundImg)}
        resizeMode="cover"
      >
        <ChatMessages />
        <SendButton setIsTyping={setIsTyping} isTyping={isTyping} />
      </ImageBackground>
    </View>
  );
}

interface AnimatedIconsProps {
  Voice: React.ElementType<any>;
  Send: React.ElementType<any>;
}
