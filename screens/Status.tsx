import { StyleSheet, View, Text } from "react-native";

export default function StatusScreen() {
  return (
    <View style={styles.container}>
      <Text>Status screen</Text>
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
