import { Button } from "@rneui/base";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultScreenStyles from "../../../styles/DefaultScreenStyles";

const ViewDiet = ({ navigation, props }) => {
  return (
    <View style={DefaultScreenStyles.container}>
      <Text>View Diet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewDiet;
