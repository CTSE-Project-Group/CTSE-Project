import { Button as Btn } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { db } from "../../../firebase";
import { Styles } from "../../../styles/CardStyles";
import DefaultScreenStyles from "../../../styles/DefaultScreenStyles";
import { StylesLocal } from "../../../styles/LocalStyles";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
  Text,
  List,
} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const AddDietNew = ({ navigation, props }) => {
  const [name, setName] = useState("");

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  return (
    <Card style={Styles.cardContainer}>
      {/* <Card.Title style={Styles.cardTitleStyle}>EEEE</Card.Title> */}
      <Card.Content style={Styles.cardContent}>
        <Text style={StylesLocal.cardTitle}>Add Pickup Details</Text>
        <ScrollView style={Styles.scrollViewBasicStyle}>
          <View>
            <TextInput
              activeUnderlineColor="#739713"
              label={insertLabel("Order name", StylesLocal.inputLabel)}
              placeholder="insert order name"
              // onChangeText={(text) => setOrderName(text)}
              style={StylesLocal.inputField}
              maxLength={20}
            />
            <TextInput
              activeUnderlineColor="#739713"
              label={insertLabel("Category", StylesLocal.inputLabel)}
              placeholder="insert order name"
              // onChangeText={(text) => setCategory(text)}
              style={StylesLocal.inputField}
              maxLength={15}
            />

            <TextInput
              activeUnderlineColor="#739713"
              label={insertLabel("Category", StylesLocal.inputLabel)}
              placeholder="insert order name"
              // onChangeText={(text) => setCategory(text)}
              style={StylesLocal.inputField}
              maxLength={15}
            />
            <TextInput
              activeUnderlineColor="#739713"
              label={insertLabel("Category", StylesLocal.inputLabel)}
              placeholder="insert order name"
              // onChangeText={(text) => setCategory(text)}
              style={StylesLocal.inputField}
              maxLength={15}
            />
            <TextInput
              keyboardType="phone-pad"
              activeUnderlineColor="#739713"
              label={insertLabel("Weight", StylesLocal.inputLabel)}
              placeholder="insert weight"
              // onChangeText={(text) => setWeight(text)}
              style={StylesLocal.inputField}
              maxLength={3}
            />
          </View>
        </ScrollView>
      </Card.Content>
      <Card.Actions style={Styles.cardActionsStyle}>
        <Button
          uppercase={false}
          // onPress={logger}
          // onPress={navigator}
          style={Styles.buttonProceed}
        >
          <Text style={Styles.text}> Proceed</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default AddDietNew;
