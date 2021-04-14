import { Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styled = StyleSheet.create({
  safe: {
    flex: 1,
    width: "100%",
    backgroundColor: "#191720",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  between: {
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
  h1: {
    fontSize: 38,
    fontWeight: "700",
    color: "#F2F4F7",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  h2: {
    fontSize: 32,
    fontWeight: "600",
    color: "#F2F4F7",
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  h3: {
    fontSize: 26,
    fontWeight: "500",
    color: "#F2F4F7",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  h4: {
    fontSize: 20,
    fontWeight: "400",
    color: "#F2F4F7",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  h5: {
    fontSize: 14,
    fontWeight: "400",
    color: "#F2F4F7",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  h6: {
    fontSize: 8,
    fontWeight: "400",
    color: "#F2F4F7",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "100",
    color: "#BDC1C6",
    paddingVertical: 5,
  },
  textCenter: {
    textAlign: "center",
  },
  link: {
    color: "#EC615B",
    paddingVertical: 15,
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#F2F4F7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTransparent: {
    backgroundColor: "transparent",
  },
  buttonTransparentText: {
    color: "#BDC1C6",
  },
  buttonText: {
    width: "100%",
    color: "#3B3941",
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#323232",
    padding: 15,
    borderRadius: 10,
    color: "#F2F4F7",
  },
  inputGroup: {
    paddingVertical: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  line: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#c0c0c0",
    borderRadius: 10
  }
});
