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
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 50,
  },
  msgTitle: {
    fontWeight: "bold",
    color: Colors.light.offBlack,
  },
  msgPreview: {
    color: Colors.light.offBlack,
    width: "75%",
  },
  msgDataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgDataSubContainer: {
    flexDirection: "column",
    alignItems: "center",
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
