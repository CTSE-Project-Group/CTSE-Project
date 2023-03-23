import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppStyles from "../../styles/AppStyles";
import DefaultScreenStyles from "../../styles/DefaultScreenStyles";
import { auth, currentUser } from "../../firebase";

const MealPlannerHome = ({ navigation, props }) => {
  console.log(auth.currentUser.displayName);
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
