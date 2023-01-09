import { View, Text, ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { FlashList } from "@shopify/flash-list";

import allConversations from "../../data/messages";
import styles from "./ChatMessages.styles";
import { Message, MessageData } from "../../types";

const messages = allConversations[0].messages;
interface MessageBubbleProps {
  item: Message;
}

export default function ChatMessages() {
  const renderMessageBubble = (props: MessageBubbleProps) => {
    const { item } = props;
    return <MessageBubble message={item} />;
  };

  return (
    <FlashList
      inverted
      data={[...messages].reverse()}
      renderItem={renderMessageBubble}
      estimatedItemSize={40}
    />
  );
}

function MessageBubble(props: MessageData) {
  const { message } = props;
  const isMyMessage = message.userID === 1;
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
        {message.text}
      </Text>
      <View
        style={{
          ...styles.timeAndReadContainer,
          left: isMyMessage ? 0 : 10,
        }}
      >
        <Text style={styles.timeText}>{message.time}</Text>
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
