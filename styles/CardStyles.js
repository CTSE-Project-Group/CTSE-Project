import { StyleSheet } from "react-native";
const defaultColor = "white";

export const Styles = StyleSheet.create({
  cardContainer: {
    paddingTop: "10%",
    height: "92%",
    backgroundColor: defaultColor,
  },
  cardContent: {
    // flex: 6,
    paddingTop: 30,
    height: "90%",
    backgroundColor: defaultColor,
    // backgroundColor: "#F90D8A",
  },
  cardActionsStyle: {
    //card action style used for single button
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
    height: "10%",
    backgroundColor: defaultColor,
  },
  scrollViewStyle: {
    padding: 10,
    borderColor: "#99A3A4",
    borderRadius: 10,
    borderWidth: 2,
  },
  // scrollViewBasicStyle: { height: "92%" },
  buttonProceed: {
    fontSize: 6,
    width: "100%",
    height: "80%",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 1,
    backgroundColor: "#95BD2A",
    borderRadius: 7,
    borderColor: "white",
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
