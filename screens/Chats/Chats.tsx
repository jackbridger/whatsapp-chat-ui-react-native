import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RootTabScreenProps } from "../../types";
import styles from "./Chats.styles";

export default function ChatsScreen({
  navigation,
}: RootTabScreenProps<"Chats">) {
  return (
    <View style={styles.container}>
      <Chats />
    </View>
  );
}

function Chats() {
  const navigation = useNavigation();
  const imgSrc = "../../assets/images/wave.png";
  const _onPress = () => {
    navigation.navigate("Chat");
  };

  return (
    <TouchableOpacity onPress={_onPress} style={styles.messageContainer}>
      <View style={styles.imgAndMsgSubContainer}>
        <Image style={styles.profileImg} source={require(imgSrc)} />
        <View>
          <Text style={styles.msgTitle}>Weekend</Text>
          <Text style={styles.msgPreview}>Sofia: Sticker</Text>
        </View>
      </View>
      <View style={styles.msgDataContainer}>
        <View style={styles.msgDataSubContainer}>
          <Text style={styles.timeText}>9:29</Text>
          <View style={styles.numberOfMsgsContainer}>
            <Text style={styles.numberOfMsgsText}>2</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
