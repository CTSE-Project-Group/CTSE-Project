import { Button } from "@rneui/base";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultScreenStyles from "../../styles/DefaultScreenStyles";

export default function MyProfile({ navigation, props }) {
  return (
    <View style={DefaultScreenStyles.container}>
      <Button>My Recipies</Button>
      <Button onPress={() => navigation.navigate("MealPLannerStack")}>
        My Diets
      </Button>
      <Button>My Shopping lists</Button>
      <Button onPress={() => navigation.navigate("EventManagerStack")}>
        Events
      </Button>
      {/* link relevant stack screen to buttons */}
    </View>
  );
}
