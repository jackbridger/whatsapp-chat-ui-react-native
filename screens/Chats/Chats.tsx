import { View, Pressable, Animated } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

import ConversationPreview from "../../components/ConversationPreview/ConversationPreview";
import { Conversation, RootTabScreenProps, User } from "../../types";
import type { RootState } from "../../redux/store";
import { addAllConversations } from "../../redux/conversationsReducer";
import { setCurrentUser } from "../../redux/usersReducer";
import getAllConversations from "../../api/getAllConversations";
import styles from "./Chats.styles";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import CreateUserDialog from "../../components/CreateUserDialog/CreateUserDialog";

interface ConversationItemProps {
  item: Conversation;
}
export default function ChatsScreen({}: RootTabScreenProps<"Chats">) {
  const [showUserDialog, setShowUserDialog] = useState<boolean>(false);

  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const conversations = useSelector(
    (state: RootState) => state.conversations.conversations
  );
  useEffect(() => {
    if (!currentUser) {
      setShowUserDialog(true);
    } else if (currentUser)
      getAllConversations(currentUser.id).then((res) => {
        const conversations = res.data;
        if (conversations) {
          dispatch(addAllConversations(conversations));
        }
      });
  }, []);

  const renderConversationPreview = (props: ConversationItemProps) => {
    const { item } = props;

    return <ConversationPreview key={item.id} conversation={item} />;
  };
  return (
    <View style={styles.mainContainer}>
      <CreateUserDialog
        visible={showUserDialog}
        setShowUserDialog={setShowUserDialog}
      />
      <FlashList
        data={conversations}
        renderItem={renderConversationPreview}
        keyExtractor={(item) => item.id}
        estimatedItemSize={40}
      />
      <CreateConversationButton />
    </View>
  );
}

const animated = new Animated.Value(1);
const fadeIn = () => {
  Animated.timing(animated, {
    toValue: 0.4,
    duration: 100,
    useNativeDriver: true,
  }).start();
};
const fadeOut = () => {
  Animated.timing(animated, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();
};

const CreateConversationButton = () => {
  const navigation = useNavigation();
  const _onPressIn = () => {
    fadeIn();
    navigation.navigate("CreateNewChat");
  };

  return (
    <Pressable onPressIn={_onPressIn} onPressOut={fadeOut}>
      <Animated.View
        style={{
          height: 50,
          width: 50,
          opacity: animated,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          position: "absolute",
          right: 20,
          bottom: 50,
          backgroundColor: Colors.light.quiteDarkGreen,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
      >
        <MaterialIcons name="message" size={20} color={Colors.light.white} />
      </Animated.View>
    </Pressable>
  );
};
