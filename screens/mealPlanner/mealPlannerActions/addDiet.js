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
  const [userId, setUserID] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [instruct, setInstruct] = useState("");
  const [morning, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [numberOfTextFields, setNumberOfTextFields] = useState(1);

  const renderTextFields = () => {
    const textFields = [];

    for (let i = 0; i < numberOfTextFields; i++) {
      textFields.push(
        <TextInput key={i} placeholder={`Text field ${i + 1}`} />
      );
    }
    return textFields;
  };

  const handleAddTextField = () => {
    setNumberOfTextFields(numberOfTextFields + 1);
  };

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
              label={insertLabel("Diet name", StylesLocal.inputLabel)}
              placeholder="insert diet name"
              // onChangeText={(text) => setOrderName(text)}
              style={StylesLocal.inputField}
              maxLength={20}
            />
            <TextInput
              activeUnderlineColor="#739713"
              label={insertLabel("Description", StylesLocal.inputLabel)}
              placeholder="insert description"
              // onChangeText={(text) => setCategory(text)}
              style={StylesLocal.inputField}
              maxLength={15}
            />

            <TextInput
              activeUnderlineColor="#739713"
              label={insertLabel("Instructions", StylesLocal.inputLabel)}
              placeholder="insert instructions"
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
