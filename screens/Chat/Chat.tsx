import { View, ImageBackground } from "react-native";
import { useState, useEffect } from "react";

import SendButton from "../../components/SendButton/SendButton";
import ChatMessages from "../../components/ChatMessages/ChatMessages";

import styles from "./Chat.styles";

export default function Chat() {
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
        <ChatMessages heightOfMessageBox={heightOfMessageBox} />
        <SendButton
          setIsTyping={setIsTyping}
          isTyping={isTyping}
          setHeightOfMessageBox={setHeightOfMessageBox}
        />
      </ImageBackground>
    </View>
  );
}

interface AnimatedIconsProps {
  Voice: React.ElementType<any>;
  Send: React.ElementType<any>;
}
