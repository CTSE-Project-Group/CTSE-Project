import { StyleSheet } from "react-native";
const defaultColor = "white";

export const RecipeMainStyles = StyleSheet.create({
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
  cardContentSmall: {
    // flex: 6,
    paddingTop: 30,
    height: "85%",
    backgroundColor: defaultColor,
    // backgroundColor: "#F90D8A",
  },
  cardContentWithoutAction: {
    // flex: 6,
    paddingTop: 30,
    height: "100%",
    backgroundColor: defaultColor,
    // backgroundColor: "#F90D8A",
  },
  cardAction12: {
    //card action style used for single button
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
    height: "10%",
    backgroundColor: defaultColor,
  },
  cardActionsRowStyle: {
    //card action style used for single button,
    fontSize: 50,
    height: "20%",
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
    backgroundColor: "#C39BD3",
    borderRadius: 7,
    borderColor: "white",
  },
  buttonEdit: {
    width: "49%",
    height: "45%",
    fontSize: 6,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 1,
    borderRadius: 7,
    borderColor: "white",
    backgroundColor: "#5499C7",
  },
  buttonDelete: {
    width: "49%",
    height: "45%",
    fontSize: 6,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 1,
    borderRadius: 7,
    borderColor: "white",
    backgroundColor: "#E74C3C",
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});