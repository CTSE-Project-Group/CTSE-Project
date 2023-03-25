import { Button as Btn } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { db, auth } from "../../../firebase";
import { Styles } from "../../../styles/CardStyles";
import DefaultScreenStyles from "../../../styles/DefaultScreenStyles";
import { StylesLocal } from "../../../styles/LocalStyles";
import { Button, Card, TextInput, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const AddDietNew = ({ navigation, props }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [instruct, setInstruct] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [numberOfTextFields, setNumberOfTextFields] = useState(1);
  const [textFieldsValues, setTextFieldsValues] = useState([
    { field1: "", field2: "" },
  ]);

  let addDiet = () => {
    const dbRef = collection(db, "diets");
    const data = {
      dietUser: auth.currentUser.uid,
      dietUserName: auth.currentUser.displayName,
      dietName: name,
      dietDesc: desc,
      dietIns: instruct,
      dietFoods: textFieldsValues,
      isShared: false,
    };
    addDoc(dbRef, data)
      .then((docRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logger = () => {
    console.log("click", auth.currentUser.displayName);
  };

  const renderTextFields = (id) => {
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
            placeholder={`insert item`}
            value={textFieldsValues[i].field1}
            onChangeText={(text) => handleTextFieldChange(text, i, "field1")}
          />
          <TextInput
            keyboardType="numeric"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            label={insertLabel("Quantity", StylesLocal.inputLabel)}
            style={StylesLocal.inputFieldDua2}
            key={i + 1}
            placeholder={`insert qty`}
            value={textFieldsValues[i].field2}
            onChangeText={(text) => handleTextFieldChange(text, i, "field2")}
          />
          <TouchableOpacity
            onPress={handleDeleteTextField}
            style={StylesLocal.deleteIconView}
          >
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
      {renderTextFields(id)}
    </View>
  );

  const renderAlert = (msg) => (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title="Cannot proceed"
      message={msg}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={true}
      cancelText="Cancel"
      confirmText="OK !"
      confirmButtonColor="#DD6B55"
      onCancelPressed={() => hideAlert()}
      onConfirmPressed={() => hideAlert()}
    />
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

  const handleDeleteTextField = (index) => {
    const newValues = [...textFieldsValues];
    newValues.splice(index, 1);
    setTextFieldsValues(newValues);
    setNumberOfTextFields(numberOfTextFields - 1);
  };

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  const iconSetter = (iconName) => {
    return (
      //used to set icons in the tab bars
      <Icon color={"#138D75"} type="MaterialIcons" name={iconName} size={30} />
    );
  };

  openAlert = () => {
    if (name == "" || desc == "" || instruct == "") {
      setShowAlert(true);
    } else if (!checkAllFieldsNotNull()) {
      setShowAlert(true);
    } else {
      addDiet();
    }
  };

  hideAlert = () => {
    setShowAlert(false);
  };

  const checkAllFieldsNotNull = () => {
    for (let i = 0; i < textFieldsValues.length; i++) {
      const obj = textFieldsValues[i];
      if (obj.field1 == "" || obj.field2 == "") {
        return false;
      }
    }
    return true;
  };

  return (
    <Card style={Styles.cardContainer}>
      {/* <Card.Title style={Styles.cardTitleStyle}>EEEE</Card.Title> */}
      <Card.Content style={Styles.cardContent}>
        <Text style={StylesLocal.cardTitle}>Create diet plan</Text>
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
                maxLength={100}
                multiline={true}
              />

              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Instructions", StylesLocal.inputLabel)}
                placeholder="insert instructions"
                onChangeText={setInstruct}
                value={instruct}
                style={StylesLocal.inputField}
                maxLength={100}
                multiline={true}
              />
            </View>
            {renderTextViews("Foods")}
          </View>
        </ScrollView>
        {renderAlert("Please fill all fields")}
      </Card.Content>
      <Card.Actions style={Styles.cardActionsStyle}>
        <Button
          uppercase={false}
          style={Styles.buttonProceed}
          onPress={() => openAlert()}
        >
          <Text style={Styles.text}> Proceed</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default AddDietNew;
