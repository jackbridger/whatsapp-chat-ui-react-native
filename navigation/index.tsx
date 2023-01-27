import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { io } from "socket.io-client";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import TopTabNavigator from "./TopTabNavigator";
import Colors from "../constants/Colors";
import Chat from "../screens/Chat/Chat";
import CreateNewChat from "../screens/CreateNewChat/CreateNewChat";
import { useEffect } from "react";

import { RootStackParamList } from "../types";
import ChatHeader from "./ChatHeader";
import CreateChatHeader from "./CreateChatHeader";
import { RootState } from "../redux/store";
import ngrokURL from "../constants/ngrokURL";
import { sendMessage } from "../redux/conversationsReducer";
import { Message, SupabaseMessage } from "../types";

const socket = io(ngrokURL);

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  useEffect(() => {
    if (currentUser) {
      socket.emit("join", {
        id: currentUser.id,
        username: currentUser.username,
        created_at: currentUser.createdAt,
      });
      socket.on("message", (message: SupabaseMessage) => {
        console.log("message received", message);
        const newMessage: Message = {
          id: message.id,
          message: message.message,
          conversationID: message.conversation_id,
          userID: message.users.id,
          isRead: false,
          time: message.created_at,
        };
        dispatch(sendMessage(newMessage));
      });
    }

    return () => {};
  }, [currentUser]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={TopTabNavigator}
        options={{
          headerShown: true,
          headerTitle: "WhatsApp",
          headerStyle: {
            backgroundColor: Colors.light.darkGreen,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: Colors.light.white,
            fontSize: 20,
          },
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: Colors.light.darkGreen,
          },
          header: ({ navigation }) => <ChatHeader navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="CreateNewChat"
        component={CreateNewChat}
        options={{
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: Colors.light.darkGreen,
          },
          header: ({ navigation }) => (
            <CreateChatHeader navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
