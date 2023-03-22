import { Button } from "@rneui/base";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultScreenStyles from "../../styles/DefaultScreenStyles";

const MyProfile = ({ navigation, props }) => {
  return (
    <View style={DefaultScreenStyles.container}>
      <Button>My Recipies</Button>
      <Button>My Diets</Button>
      <Button>My Shopping lists</Button>
      <Button>Events</Button>
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

export default MyProfile;
