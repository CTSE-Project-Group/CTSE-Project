import { Button } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { db } from "../../../firebase";
import DefaultScreenStyles from "../../../styles/DefaultScreenStyles";

const AddDiet = ({ navigation, props }) => {
  const [name, setName] = useState("");

  return (
    <View style={DefaultScreenStyles.container}>
      <Text>Add Diets</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#BEBEBE"
        value={name}
        onChangeText={setName}
      />
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

export default AddDiet;
