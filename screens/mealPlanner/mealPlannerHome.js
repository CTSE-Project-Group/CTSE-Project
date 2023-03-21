import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppStyles from "../../styles/AppStyles";
import DefaultScreenStyles from "../../styles/DefaultScreenStyles";

const MealPlannerHome = () => {
  return (
    <View style={DefaultScreenStyles.container}>
      <Text>Meal planner Home</Text>
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

export default MealPlannerHome;
