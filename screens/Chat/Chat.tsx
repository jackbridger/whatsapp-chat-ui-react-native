import { View, ImageBackground, TextInput } from "react-native";
import Colors from "../../constants/Colors";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import styles from "./Chat.styles";

export default function Chat() {
  const whatsappBackgroundImg = "../../assets/images/whatsapp.png";
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require(whatsappBackgroundImg)}
        resizeMode="cover"
      >
        <ChatMessages />
        <SendButton />
      </ImageBackground>
    </View>
  );
}

function SendButton() {
  return (
    <View style={styles.container}>
      <View style={styles.textBoxContainer}>
        <Entypo name="emoji-happy" size={24} color={Colors.light.grey} />
        <TextInput style={styles.textInput} value="Type a message" />
        <Entypo name="camera" size={24} color={Colors.light.grey} />
      </View>
      <View style={styles.voiceButtonContainer}>
        <View style={styles.voiceButton}>
          <FontAwesome5
            name="microphone"
            size={24}
            color={Colors.light.white}
          />
        </View>
      </View>
    </View>
  );
}
