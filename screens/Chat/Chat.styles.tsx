import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  sendBtnContainer: {
    // flexGrow: 1,
    height: "12%",
    padding: "3%",
    flexDirection: "row",
    position: "absolute",
    left: 0,
    backgroundColor: Colors.light.white,
  },
  backgroundImg: {
    flex: 1,
  },
  textBoxContainer: {
    backgroundColor: Colors.light.white,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    height: "70%",
    paddingHorizontal: "2%",
    borderRadius: 5,
  },
  textInput: {
    width: "75%",
    marginHorizontal: "3%",
    fontSize: 20,
    color: Colors.light.text,
    opacity: 0.3,
  },
  voiceButtonContainer: {
    height: "70%",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  voiceButton: {
    backgroundColor: Colors.light.quiteDarkGreen,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
