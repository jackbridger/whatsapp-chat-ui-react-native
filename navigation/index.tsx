import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Image, View, Text } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ChatsScreen from "../screens/Chats/Chats";
import StatusScreen from "../screens/Status";
import Chat from "../screens/Chat/Chat";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
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
            backgroundColor: "#075d54",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
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
            backgroundColor: "#075d54",
          },
          header: ({ navigation, route, options, back }) => {
            const imgSrc = "../assets/images/wave.png";
            const title = getHeaderTitle(options, route.name);
            return (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#075d54",
                  height: 100,
                  width: "100%",
                  paddingTop: 40,
                  paddingHorizontal: 6,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    {({ pressed }) => (
                      <Ionicons name="arrow-back" size={32} color="white" />
                    )}
                  </Pressable>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 10,
                      borderRadius: 50,
                    }}
                    source={require(imgSrc)}
                  />
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "600" }}
                  >
                    Sanskriti
                  </Text>
                </View>
                <View
                  style={{
                    width: 120,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FontAwesome name="phone" size={24} color="white" />
                  <FontAwesome name="paperclip" size={24} color="white" />
                  <Entypo name="dots-three-vertical" size={24} color="white" />
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator<RootTabParamList>();

function TopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <TopTab.Navigator
      tabBarPosition="top"
      initialRouteName="Chats"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
        tabBarInactiveTintColor: "#7aa8a2",
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        tabBarItemStyle: { width: 130 },
        tabBarStyle: {
          backgroundColor: "#075d54",
        },
        tabBarIconStyle: {
          display: "none",
        },
      }}
    >
      <TopTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }: RootTabScreenProps<"Chats">) => ({
          title: "Chats",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <TopTab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          title: "Status",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <TopTab.Screen
        name="Calls"
        component={StatusScreen}
        options={{
          title: "Calls",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </TopTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
