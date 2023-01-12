import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";

export default function ModalScreen() {
  return (
    <View>
      <EditScreenInfo path="/screens/ModalScreen.tsx" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
