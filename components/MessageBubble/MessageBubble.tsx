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
  const isMyMessage = message.userID === currentUser?.id;
  const isMessageRead = false;
  return (
    <View
      style={{
        ...styles.messageContainer,
        alignSelf: isMyMessage ? "flex-start" : "flex-end",
        backgroundColor: isMyMessage ? "#fcfcfc" : "#dfffc7",
        borderTopLeftRadius: isMyMessage ? 0 : 5,
        borderTopRightRadius: isMyMessage ? 5 : 0,
      }}
    >
      <View
        style={{
          ...styles.leftMessageArrow,
          display: isMyMessage ? "flex" : "none",
        }}
      ></View>
      <Text
        style={{
          ...styles.messageText,
          left: isMyMessage ? 0 : 10,
        }}
      >
        {message.message}
      </Text>
      <View
        style={{
          ...styles.timeAndReadContainer,
          left: isMyMessage ? 0 : 10,
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
            display: isMyMessage ? "none" : "flex",
          }}
        ></View>
      </View>
    </View>
  );
}
