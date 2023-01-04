import { View, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useRef } from "react";

import messages from "../data/messages";

export default function ChatMessages() {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd();
      }}
      style={{ height: "88%" }}
    >
      {messages.map((message) =>
        message.userID === 1 ? (
          <MessageBubble message={message} />
        ) : (
          <MessageBubble message={message} />
        )
      )}
    </ScrollView>
  );
}
interface MessageData {
  message: Message;
}
type Message = {
  text: string;
  time: string;
  userID: number;
};

function MessageBubble(props: MessageData) {
  const { message } = props;
  const isMyMessage = message.userID === 1;
  const isMessageRead = false;
  return (
    <View
      style={{
        backgroundColor: isMyMessage ? "#fcfcfc" : "#dfffc7",
        width: "65%",
        alignSelf: isMyMessage ? "flex-start" : "flex-end",
        marginVertical: 3,
        marginHorizontal: 16,
        paddingVertical: 10,
        flexDirection: "row",
        borderRadius: 5,
        borderTopLeftRadius: isMyMessage ? 0 : 5,
        borderTopRightRadius: isMyMessage ? 5 : 0,
      }}
    >
      <View
        style={{
          height: 0,
          width: 0,
          borderLeftWidth: 10,
          borderLeftColor: "transparent",
          borderTopColor: "white",
          borderTopWidth: 10,
          alignSelf: "flex-start",
          borderRightColor: "black",
          right: 10,
          bottom: 10,
          display: isMyMessage ? "flex" : "none",
        }}
      ></View>
      <Text
        style={{
          fontSize: 16,
          width: "65%",
          left: isMyMessage ? 0 : 10,
        }}
      >
        {message.text}
      </Text>
      <View
        style={{
          flexDirection: "row",
          left: isMyMessage ? 0 : 10,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "grey",
          }}
        >
          {message.time}
        </Text>
        <View style={{}}>
          {isMessageRead ? (
            <MaterialCommunityIcons name="read" size={16} color="#5bb6c9" />
          ) : (
            <MaterialCommunityIcons name="check" size={16} color="grey" />
          )}
        </View>
        <View
          style={{
            height: 0,
            width: 0,
            borderRightWidth: 10,
            borderRightColor: "transparent",
            borderTopColor: "#dfffc7",
            borderTopWidth: 10,
            alignSelf: "flex-start",
            left: 9,
            bottom: 10,
            display: isMyMessage ? "none" : "flex",
          }}
        ></View>
      </View>
    </View>
  );
}
