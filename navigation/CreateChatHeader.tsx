import { useContext, useEffect } from "react";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { Pressable, Image, View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { useSelector } from "react-redux";

import images from "../assets/index";
import type { RootState } from "../redux/store";

import Colors from "../constants/Colors";

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}

export default function CreateChatHeader(props: Props) {
  const { navigation } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.light.darkGreen,
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
            <Ionicons name="arrow-back" size={32} color={Colors.light.white} />
          )}
        </Pressable>
        <Text
          style={{
            paddingLeft: 40,
            color: Colors.light.white,
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Select contact
        </Text>
      </View>
      <View
        style={{
          width: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FontAwesome name="search" size={24} color={Colors.light.white} />
        <Entypo
          name="dots-three-vertical"
          size={24}
          color={Colors.light.white}
        />
      </View>
    </View>
  );
}
