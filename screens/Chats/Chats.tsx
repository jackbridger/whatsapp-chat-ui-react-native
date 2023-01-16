import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useContext } from "react";

import ConversationPreview from "../../components/ConversationPreview/ConversationPreview";
import { ConversationType, RootTabScreenProps } from "../../types";
import { ConversationsContext } from "../../context/conversationContext";
import styles from "./Chats.styles";

interface ConversationItemProps {
  item: ConversationType;
}
export default function ChatsScreen({}: RootTabScreenProps<"Chats">) {
  const { conversations } = useContext(ConversationsContext);
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
