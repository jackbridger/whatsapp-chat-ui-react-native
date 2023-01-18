import { StyleSheet, View, Text } from "react-native";

export default function CallsScreen() {
  return (
    <View style={styles.container}>
      <Text>Calls screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
