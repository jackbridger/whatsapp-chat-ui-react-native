import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    color: Colors.light.text,
    backgroundColor: Colors.light.white,
  },

  messageContainer: {
    width: "90%",
    height: "12%",
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
    borderRadius: 50,
  },
  msgTitle: {
    fontWeight: "bold",
    color: Colors.light.offBlack,
  },
  msgPreview: {
    color: Colors.light.offBlack,
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
