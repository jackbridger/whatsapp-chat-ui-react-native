import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";

import ConversationPreview from "../../components/ConversationPreview/ConversationPreview";
import { ConversationType, RootTabScreenProps } from "../../types";
import type { RootState } from "../../redux/store";
import styles from "./Chats.styles";

interface ConversationItemProps {
  item: ConversationType;
}
export default function ChatsScreen({}: RootTabScreenProps<"Chats">) {
  const conversations = useSelector((state: RootState) => state.conversations);

  const renderConversationPreview = (props: ConversationItemProps) => {
    const { item } = props;

    return <ConversationPreview key={item.id} conversation={item} />;
  };
  return (
    <View style={styles.mainContainer}>
      <FlashList
        data={conversations.conversations}
        renderItem={renderConversationPreview}
        keyExtractor={(item) => item.id}
        estimatedItemSize={40}
      />
    </View>
  );
}
