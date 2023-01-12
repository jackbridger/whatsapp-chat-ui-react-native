import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import TopTabNavigator from "./TopTabNavigator";
import Colors from "../constants/Colors";
import Chat from "../screens/Chat/Chat";
import ModalScreen from "../screens/ModalScreen";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ChatHeader from "./ChatHeader";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
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
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
