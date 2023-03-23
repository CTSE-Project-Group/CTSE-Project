import { Button as Btn } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
  const [morning, setBreakfast] = useState(["", ""]);
  const [lunch, setLunch] = useState(["", ""]);
  const [dinner, setDinner] = useState(["", ""]);
  const [numberOfTextFields, setNumberOfTextFields] = useState(1);
  const [textFieldsValues, setTextFieldsValues] = useState([
    { field1: "", field2: "" },
  ]);
  const [breakfastValues, setBreakfastValues] = useState([
    { field1: "", field2: "" },
  ]);
  const [lunchValues, setLunchValues] = useState([{ field1: "", field2: "" }]);
  const [dinnerValues, setDinnerValues] = useState([
    { field1: "", field2: "" },
  ]);

  const renderTextFields = () => {
    const textFields = [];

    for (let i = 0; i < numberOfTextFields; i++) {
      textFields.push(
        <View key={i} style={StylesLocal.dynamicTextFieldContainer}>
          <TextInput
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            label={insertLabel("Food", StylesLocal.inputLabel)}
            style={StylesLocal.inputFieldDual}
            key={i}
            placeholder={`Text field ${i}`}
            value={textFieldsValues[i].field1}
            onChangeText={(text) => handleTextFieldChange(text, i, "field1")}
          />
          <TextInput
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            label={insertLabel("Quantity", StylesLocal.inputLabel)}
            style={StylesLocal.inputFieldDua2}
            key={i + 1}
            placeholder={`Text field ${i + 1}`}
            value={textFieldsValues[i].field2}
            onChangeText={(text) => handleTextFieldChange(text, i, "field2")}
          />
          <TouchableOpacity onPress={logger} style={StylesLocal.deleteIconView}>
            {iconSetter("md-close")}
          </TouchableOpacity>
        </View>
      );
    }
    return textFields;
  };

  const renderTextViews = (id) => (
    <View id={id} style={StylesLocal.dynamicTextView}>
      <View style={StylesLocal.dynamicTextViewHeader}>
        <Text style={StylesLocal.dynamicTextViewTitle}>{id}</Text>
        <TouchableOpacity
          style={StylesLocal.addIconView}
          onPress={handleAddTextField}
        >
          {iconSetter("add-circle")}
        </TouchableOpacity>
      </View>
      {renderTextFields()}
    </View>
  );

  const handleAddTextField = () => {
    setNumberOfTextFields(numberOfTextFields + 1);
    setTextFieldsValues([...textFieldsValues, { field1: "", field2: "" }]);
  };

  const handleTextFieldChange = (text, index, field) => {
    const newValues = [...textFieldsValues];
    newValues[index][field] = text;
    setTextFieldsValues(newValues);
  };

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  const logger = () => {
    console.log("click");
  };

  const iconSetter = (iconName) => {
    return (
      //used to set icons in the tab bar
      <Icon color={"#138D75"} type="MaterialIcons" name={iconName} size={30} />
    );
  };

  return (
    <Card style={Styles.cardContainer}>
      {/* <Card.Title style={Styles.cardTitleStyle}>EEEE</Card.Title> */}
      <Card.Content style={Styles.cardContent}>
        <Text style={StylesLocal.cardTitle}>Add Pickup Details</Text>
        <ScrollView style={Styles.scrollViewBasicStyle}>
          <View>
            <View style={StylesLocal.staticTextView}>
              <Text style={StylesLocal.staticTextViewTitle}>Diet info</Text>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Diet name", StylesLocal.inputLabel)}
                placeholder="insert diet name"
                value={name}
                onChangeText={setName}
                style={StylesLocal.inputField}
                maxLength={20}
              />
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Description", StylesLocal.inputLabel)}
                placeholder="insert description"
                value={desc}
                onChangeText={setDesc}
                style={StylesLocal.inputField}
                maxLength={15}
              />

              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Instructions", StylesLocal.inputLabel)}
                placeholder="insert instructions"
                onChangeText={setInstruct}
                value={instruct}
                style={StylesLocal.inputField}
                maxLength={15}
              />
            </View>
            {renderTextViews("Breakfast")}
            {renderTextViews("Lunch")}
            <Text>Text field values: {JSON.stringify(textFieldsValues)}</Text>
          </View>
        </ScrollView>
      </Card.Content>
      <Card.Actions style={Styles.cardActionsStyle}>
        <Button uppercase={false} style={Styles.buttonProceed}>
          <Text style={Styles.text}> Proceed</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default AddDietNew;
