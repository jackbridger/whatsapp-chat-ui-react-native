import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  messageContainer: {
    width: windowWidth * 0.97,
    height: windowHeight / 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imgAndMsgSubContainer: {
    flexDirection: "row",
    width: "90%",
    height: "100%",
    alignItems: "center",
  },
  profileImg: {
    width: 40,
    height: 40,
    marginRight: 14,
    borderRadius: 50,
  },
  msgTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.light.offBlack,
  },
  msgSubTitle: {
    color: Colors.light.grey,
  },
  msgPreview: {
    color: Colors.light.offBlack,
    width: "80%",
  },
  msgDataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgDataSubContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  timeText: {
    color: Colors.light.brightGreen,
  },
  numberOfMsgsContainer: {
    backgroundColor: Colors.light.brightGreen,
    height: 20,
    width: 20,
    borderRadius: 50,
    padding: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  numberOfMsgsText: {
    color: Colors.light.white,
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },
});
