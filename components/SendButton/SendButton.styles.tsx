import { StyleSheet, Dimensions } from "react-native";

import Colors from "../../constants/Colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  sendBtnContainer: {
    minHeight: windowHeight * 0.06,
    maxHeight: windowHeight * 0.4,
    paddingHorizontal: "1%",
    position: "absolute",
    left: 0,
    width: windowWidth,
    alignContent: "center",
  },

  textBoxContainer: {
    maxHeight: windowHeight * 0.3,
    backgroundColor: Colors.light.white,
    width: "87%",
    margin: "1%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "2%",
    paddingVertical: "1%",
    borderRadius: 20,
  },
  textInput: {
    width: "80%",
    marginHorizontal: "2%",
    fontSize: 20,
    color: Colors.light.text,
    opacity: 0.3,
  },
  voiceButtonContainer: {
    width: "11%",
    justifyContent: "center",
    alignContent: "center",
  },
  voiceButton: {
    backgroundColor: Colors.light.quiteDarkGreen,
    borderRadius: 50,
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
});
