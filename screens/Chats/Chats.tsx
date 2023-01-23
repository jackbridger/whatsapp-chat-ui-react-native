import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import ConversationPreview from "../../components/ConversationPreview/ConversationPreview";
import { Conversation, RootTabScreenProps } from "../../types";
import type { RootState } from "../../redux/store";
import { addAllConversations } from "../../redux/conversationsReducer";
import styles from "./Chats.styles";

interface ConversationItemProps {
  item: Conversation;
}
export default function ChatsScreen({}: RootTabScreenProps<"Chats">) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addAllConversations());
  }, []);

  const conversations = useSelector(
    (state: RootState) => state.conversations.conversations
  );
  console.log(conversations);

  const renderConversationPreview = (props: ConversationItemProps) => {
    const { item } = props;

    return <ConversationPreview key={item.id} conversation={item} />;
  };
  return (
    <View style={styles.mainContainer}>
      <FlashList
        data={conversations}
        renderItem={renderConversationPreview}
        keyExtractor={(item) => item.id}
        estimatedItemSize={40}
      />
    </View>
  );
}
