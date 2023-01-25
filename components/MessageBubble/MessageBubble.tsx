import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { MessageData } from "../../types";
import styles from "./MessageBubble.styles";
import { RootState } from "../../redux/store";

export default function MessageBubble(props: MessageData) {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const { message } = props;
  console.log("my user id is  " + currentUser?.id);
  console.log("message user id is " + message.userID);
  const isMyMessage = message.userID === currentUser?.id;
  const isMessageRead = false;
  return (
    <View
      style={{
        ...styles.messageContainer,
        alignSelf: isMyMessage ? "flex-end" : "flex-start",
        backgroundColor: isMyMessage ? "#dfffc7" : "#fcfcfc",
        borderTopLeftRadius: isMyMessage ? 5 : 0,
        borderTopRightRadius: isMyMessage ? 0 : 5,
      }}
    >
      <View
        style={{
          ...styles.leftMessageArrow,
          display: isMyMessage ? "none" : "flex",
        }}
      ></View>
      <Text
        style={{
          ...styles.messageText,
          left: isMyMessage ? 10 : 0,
        }}
      >
        {message.message}
      </Text>
      <View
        style={{
          ...styles.timeAndReadContainer,
          left: isMyMessage ? 10 : 0,
        }}
      >
        <Text style={styles.timeText}>
          {dayjs(message.time).format("HH:mm A")}
        </Text>
        <View>
          {isMessageRead ? (
            <MaterialCommunityIcons name="read" size={16} color="#5bb6c9" />
          ) : (
            <MaterialCommunityIcons name="check" size={16} color="grey" />
          )}
        </View>
        <View
          style={{
            ...styles.rightMsgArrow,
            display: isMyMessage ? "flex" : "none",
          }}
        ></View>
      </View>
    </View>
  );
}
