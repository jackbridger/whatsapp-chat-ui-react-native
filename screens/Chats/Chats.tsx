import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import ConversationPreview from "../../components/ConversationPreview/ConversationPreview";
import { Conversation, RootTabScreenProps } from "../../types";
import conversations from "../../data/messages";

import styles from "./Chats.styles";

interface ConversationItemProps {
  item: Conversation;
}
export default function ChatsScreen({
  navigation,
}: RootTabScreenProps<"Chats">) {
  const renderConversationPreview = (props: ConversationItemProps) => {
    const { item } = props;
    return <ConversationPreview key={item.id} conversation={item} />;
  };
  return (
    <View style={styles.mainContainer}>
      <FlashList
        contentContainerStyle={styles.listContainer}
        data={conversations}
        renderItem={renderConversationPreview}
        keyExtractor={(item) => item.id}
        estimatedItemSize={40}
      />
    </View>
  );
}
