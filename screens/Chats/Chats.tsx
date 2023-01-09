import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

import { Conversation, RootTabScreenProps } from "../../types";
import styles from "./Chats.styles";
import conversations from "../../data/messages";
import { SafeAreaView } from "react-native-safe-area-context";

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

type ConversationPreviewProps = {
  conversation: Conversation;
};

function ConversationPreview(props: ConversationPreviewProps) {
  const { conversation } = props;
  const navigation = useNavigation();
  const imgSrc = "../../assets/images/wave.png";
  const _onPress = () => {
    navigation.navigate("Chat");
  };
  return (
    <TouchableOpacity onPress={_onPress} style={styles.messageContainer}>
      <View style={styles.imgAndMsgSubContainer}>
        <Image style={styles.profileImg} source={require(imgSrc)} />
        <View>
          <Text style={styles.msgTitle}>{conversation.title}</Text>
          <Text style={styles.msgPreview}>
            {conversation.messages[conversation.messages.length - 1].text}
          </Text>
        </View>
      </View>
      <View style={styles.msgDataContainer}>
        <View style={styles.msgDataSubContainer}>
          <Text style={styles.timeText}>9:29</Text>
          <View style={styles.numberOfMsgsContainer}>
            <Text style={styles.numberOfMsgsText}>2</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
