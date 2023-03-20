import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TestScreen = () => {
  return (
    <View style={styles.container}>
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
