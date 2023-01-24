import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import TopTabNavigator from "./TopTabNavigator";
import Colors from "../constants/Colors";
import Chat from "../screens/Chat/Chat";
import CreateNewChat from "../screens/CreateNewChat/CreateNewChat";

import { RootStackParamList } from "../types";
import ChatHeader from "./ChatHeader";
import CreateChatHeader from "./CreateChatHeader";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
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
