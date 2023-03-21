import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultScreenStyles from "../../styles/DefaultScreenStyles";

const TestScreen = ({ navigation, props }) => {
  return (
    <View style={DefaultScreenStyles.container}>
      <Text>Test Screen</Text>
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

export default TestScreen;
