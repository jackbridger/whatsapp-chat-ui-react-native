import {
  View,
  TextInput,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useState, useRef, useContext } from "react";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import useKeyboardOffsetHeight from "../../helpers/useKeyboardOffsetHeight";
import { Conversation } from "../../types";
import { sendMessage } from "../../redux/conversationsReducer";
import formatMessage from "../../helpers/formatMessage";

function _prepMessage(
  newMsg: string,
  thisConversationID: string,
  userID: number,
  setNewMsg: (msg: string) => void,
  isTyping: boolean,
  setIsTyping: (isTyping: boolean) => void
) {
  if (isTyping) {
    setNewMsg("");
    setIsTyping(false);
    const message = formatMessage(newMsg, userID, thisConversationID);
    return message;
  }
}

import styles from "./SendButton.styles";
import addNewMessage from "../../api/addNewMessage";

interface SendButtonProps {
  setIsTyping: (isTyping: boolean) => void;
  isTyping: boolean;
  setHeightOfMessageBox: (height: number) => void;
  heightOfMessageBox: number;
  thisConversation: Conversation;
}
export default function SendButton(props: SendButtonProps) {
  const dispatch = useDispatch();
  const whatsappBackgroundImg = "../../assets/images/whatsapp.png";
  const { setIsTyping, isTyping, setHeightOfMessageBox, thisConversation } =
    props;
  const [newMsg, setNewMsg] = useState("");
  const ref = useRef<TransitioningView | null>(null);
  const keyBoardOffsetHeight = useKeyboardOffsetHeight();
  const userID = "bf6e83b9-926c-4dbd-bf26-5f88118e887f";

  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      style={{
        ...styles.sendBtnContainer,
        bottom: Math.max(keyBoardOffsetHeight, windowHeight * 0.02),
      }}
    >
      <ImageBackground
        style={{ flex: 1, flexDirection: "row", width: "100%" }}
        source={require(whatsappBackgroundImg)}
        resizeMode="cover"
      >
        <View style={styles.textBoxContainer}>
          <Entypo
            name="emoji-happy"
            size={24}
            color={Colors.light.grey}
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
            }}
          />
          <TextInput
            editable
            multiline
            style={styles.textInput}
            value={newMsg}
            placeholder="Message"
            onContentSizeChange={(e) => {
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
          <Entypo
            name="camera"
            size={24}
            color={Colors.light.grey}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
          />
        </View>
        <View
          style={{
            ...styles.voiceButtonContainer,
            position: "absolute",
            right: 0,
            bottom: 6,
          }}
        >
          <Pressable
            style={styles.voiceButton}
            onPress={() => {
              const message = _prepMessage(
                newMsg,
                thisConversation.id,
                userID,
                setNewMsg,
                isTyping,
                setIsTyping
              );
              if (message) {
                addNewMessage(message).then((res) => {
                  console.log(res);
                  dispatch(sendMessage(message));
                });
              }
            }}
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
