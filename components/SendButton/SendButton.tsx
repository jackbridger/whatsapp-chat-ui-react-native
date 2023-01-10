import { View, TextInput, Pressable, Keyboard } from "react-native";
import { useEffect, useState, useRef } from "react";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";

import Colors from "../../constants/Colors";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";

import styles from "./SendButton.styles";

interface SendButtonProps {
  setIsTyping: (isTyping: boolean) => void;
  isTyping: boolean;
}
export default function SendButton(props: SendButtonProps) {
  const [keyBoardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardOffset(e.endCoordinates.height); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOffset(0); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const { setIsTyping, isTyping } = props;
  const [newMsg, setNewMsg] = useState("");
  const ref = useRef<TransitioningView | null>(null);
  const sendMsg = () => {
    if (isTyping) {
      setNewMsg("");
      setIsTyping(false);
    }
  };

  return (
    <View
      style={{
        ...styles.sendBtnContainer,
        bottom: keyBoardOffset,
      }}
    >
      <View style={styles.textBoxContainer}>
        <Entypo name="emoji-happy" size={24} color={Colors.light.grey} />
        <TextInput
          editable
          multiline
          style={styles.textInput}
          value={newMsg}
          placeholder="Type a message"
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
        <Pressable style={styles.voiceButton} onPress={sendMsg}>
          <Transitioning.View ref={ref} transition={msgTypeTransition}>
            {isTyping ? (
              <Ionicons name="send" size={24} color={Colors.light.white} />
            ) : (
              <FontAwesome5
                name="microphone"
                size={24}
                color={Colors.light.white}
              />
            )}
          </Transitioning.View>
        </Pressable>
      </View>
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
