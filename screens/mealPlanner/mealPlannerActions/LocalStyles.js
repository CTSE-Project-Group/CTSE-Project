import { StyleSheet } from "react-native";

const commonBorderProps = {
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  borderRadius: 12,
};

const commonInputFieldProps = {
  fontSize: 15,
  height: 70,
};

const commonDynamicTextViewProps = {
  borderWidth: 5,
  borderRadius: 15,
  padding: 5,
};

const commonDynamicTextViewTitleProps = {
  letterSpacing: 0.5,
  fontWeight: "regular",
  fontSize: 20,
  marginBottom: 5,
  left: "2%",
};

const commonStaticTextViewTitleProps = {
  letterSpacing: 0.5,
  fontWeight: "bold",
  fontSize: 20,
  marginBottom: 5,
  left: "2%",
};

const commonstaticTextViewProps = {
  borderWidth: 5,
  marginBottom: 5,
  borderRadius: 15,
  padding: 5,
};

const commonDynamicTextViewHeaderProps = {};

export const DietStylesLocal = StyleSheet.create({
  cardContent: {
    marginTop: 30,
    height: "90%",
    backgroundColor: "#E0E1DF",
  },
  cardTitle: {
    color: "#1A5276",
    fontSize: 25,
    // textAlign: "center",
    marginBottom: 20,
    left: "3%",
  },
  inputField: {
    ...commonBorderProps,
    ...commonInputFieldProps,
    marginBottom: 5,
    backgroundColor: "#FBEEE6",
    paddingBottom: 5,
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "regular",
    letterSpacing: 0.25,
    color: "white",
    paddingTop: 5,
  },
  inputFieldDual: {
    ...commonBorderProps,
    ...commonInputFieldProps,
    width: "49%",
    backgroundColor: "#E8F6F3",
    marginBottom: 5,
    marginRight: 5,
  },
  inputFieldDua2: {
    ...commonBorderProps,
    ...commonInputFieldProps,
    width: "49%",
    backgroundColor: "#E8F6F3",
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 17,
    color: "black",
  },
  dynamicTextFieldContainer: {
    flexDirection: "row",
  },
  dynamicTextFieldOuterContainer: {
    ...commonstaticTextViewProps,
    borderColor: "#A2D9CE",
  },
  dynamicTextView: {
    ...commonDynamicTextViewProps,
    borderColor: "#A2D9CE",
    marginBottom: 5,
  },
  dynamicTextViewHeader: {
    flexDirection: "row",
  },
  dynamicTextViewTitle: {
    ...commonDynamicTextViewTitleProps,
    color: "#138D75",
    left: "10%",
  },
  staticTextView: {
    ...commonstaticTextViewProps,
    borderColor: "#F5CBA7",
  },
  staticTextViewTitle: {
    ...commonStaticTextViewTitleProps,
    color: "#DC7633",
  },
  staticTextViewAuthor: {
    ...commonStaticTextViewTitleProps,
    color: "#2E4053",
  },
  deleteIconView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addIconView: {
    right: -110,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
