import {
  View,
  TextInput,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useState, useRef } from "react";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import useKeyboardOffsetHeight from "../../helpers/useKeyboardOffsetHeight";
import sendMsg from "../../messaging/sendNewMessage";

import styles from "./SendButton.styles";

interface SendButtonProps {
  setIsTyping: (isTyping: boolean) => void;
  isTyping: boolean;
  setHeightOfMessageBox: (height: number) => void;
}
export default function SendButton(props: SendButtonProps) {
  const whatsappBackgroundImg = "../../assets/images/whatsapp.png";
  const { setIsTyping, isTyping, setHeightOfMessageBox } = props;
  const [newMsg, setNewMsg] = useState("");
  const ref = useRef<TransitioningView | null>(null);
  const keyBoardOffsetHeight = useKeyboardOffsetHeight();
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      style={{
        ...styles.sendBtnContainer,
        bottom: Math.max(keyBoardOffsetHeight, windowHeight * 0.01),
      }}
    >
      <ImageBackground
        style={{ flex: 1, flexDirection: "row", width: "100%" }}
        source={require(whatsappBackgroundImg)}
        resizeMode="cover"
      >
        {/* <ImageBackground
        // style={styles.backgroundImg}
        source={require(whatsappBackgroundImg)}
        resizeMode="cover"
      > */}
        <View style={styles.textBoxContainer}>
          <Entypo name="emoji-happy" size={24} color={Colors.light.grey} />
          <TextInput
            editable
            multiline
            style={styles.textInput}
            value={newMsg}
            placeholder="Message"
            onContentSizeChange={(e) => {
              console.log("message height:");
              console.log(e.nativeEvent.contentSize.height);
              console.log(e.nativeEvent.contentSize);
              setHeightOfMessageBox(e.nativeEvent.contentSize.height);
            }}
            onChangeText={(_msg) => {
              if (_msg !== "" && isTyping === false) {
                setIsTyping(true);
                ref.current?.animateNextTransition();
              } else if (isTyping === true && _msg === "") {
                setIsTyping(false);
                ref.current?.animateNextTransition();
              }
              setNewMsg(_msg);
            }}
          />
          <Entypo name="camera" size={24} color={Colors.light.grey} />
        </View>
        <View style={styles.voiceButtonContainer}>
          <Pressable
            style={styles.voiceButton}
            onPress={() =>
              sendMsg({ isTyping, setIsTyping, newMsg, setNewMsg })
            }
          >
            <Transitioning.View ref={ref} transition={msgTypeTransition}>
              {isTyping ? (
                <Ionicons name="send" size={16} color={Colors.light.white} />
              ) : (
                <FontAwesome5
                  name="microphone"
                  size={16}
                  color={Colors.light.white}
                />
              )}
            </Transitioning.View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const msgTypeTransition = (
  <Transition.Together>
    <Transition.Out type="scale" durationMs={100} />
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="scale" durationMs={100} />
  </Transition.Together>
);
