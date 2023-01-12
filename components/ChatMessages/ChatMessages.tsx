import { View, Dimensions } from "react-native";

import { FlashList } from "@shopify/flash-list";

import allConversations from "../../data/messages";
import { Message } from "../../types";
import useKeyboardOffsetHeight from "../../helpers/useKeyboardOffsetHeight";
import getMessageHeightOffset from "../../helpers/getMessageBoxHeightOffset";
import MessageBubble from "../MessageBubble/MessageBubble";

const windowHeight = Dimensions.get("window").height;

const messages = allConversations[0].messages;
interface MessageBubbleProps {
  item: Message;
}
interface ChatMessagesProps {
  heightOfMessageBox: number;
}

export default function ChatMessages(props: ChatMessagesProps) {
  const { heightOfMessageBox } = props;
  const keyBoardOffsetHeight = useKeyboardOffsetHeight();
  const renderMessageBubble = (props: MessageBubbleProps) => {
    const { item } = props;
    return <MessageBubble message={item} />;
  };

  return (
    <View
      style={{
        height:
          windowHeight * 0.875 -
          keyBoardOffsetHeight -
          getMessageHeightOffset(heightOfMessageBox, windowHeight),
      }}
    >
      <FlashList
        inverted
        data={[...messages].reverse()}
        renderItem={renderMessageBubble}
        estimatedItemSize={40}
      />
    </View>
  );
}
