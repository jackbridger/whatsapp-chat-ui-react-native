import * as React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "../constants/Colors";
import ChatsScreen from "../screens/Chats/Chats";
import StatusScreen from "../screens/Status";

import { RootTabParamList, RootTabScreenProps } from "../types";

const TopTab = createMaterialTopTabNavigator<RootTabParamList>();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator
      tabBarPosition="top"
      initialRouteName="Chats"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: Colors.light.white,
        },
        tabBarInactiveTintColor: Colors.light.inactiveGreen,
        tabBarActiveTintColor: Colors.light.white,
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: Colors.light.darkGreen,
        },
      }}
    >
      <TopTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }: RootTabScreenProps<"Chats">) => ({
          title: "Chats",
        })}
      />
      <TopTab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          title: "Status",
        }}
      />
      <TopTab.Screen
        name="Calls"
        component={StatusScreen}
        options={{
          title: "Calls",
        }}
      />
    </TopTab.Navigator>
  );
}
