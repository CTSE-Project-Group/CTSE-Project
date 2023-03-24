import { Button as Btn } from "@rneui/base";
import React, { useState, useEffect } from "react";
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
  getDoc,
  updateDoc,
} from "firebase/firestore";

const EditDietNew = ({ navigation, route }) => {
  const [dietID, setDietId] = useState("");
  const [dietArrLen, setDietArrLen] = useState(0);
  const [dietArr, setDietArr] = useState([{ field1: "", field2: "" }]);
  const [diet, setDiet] = useState();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [instruct, setInstruct] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getDiet();
  }, []);

  const getDiet = async () => {
    const docRef = doc(db, "diets", route.params);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      const data = docSnap.data();
      const id = docSnap.id;
      setDietId(id);
      setDiet(data);
      setName(data.dietName);
      setDesc(data.dietDesc);
      setInstruct(data.dietIns);
      setDietArrLen(data.dietFoods.length);
      setDietArr(data.dietFoods);
    } else {
      console.log("No such document!");
    }
  };

  let updateDiet = () => {
    const data = {
      dietUser: diet.dietUser,
      dietUserName: diet.dietUserName,
      dietName: name,
      dietDesc: desc,
      dietIns: instruct,
      dietFoods: dietArr,
      isShared: false,
    };

    const docRef = doc(db, "diets", route.params);
    setDoc(docRef, data)
      .then(() => {
        console.log("Doc Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logger = () => {
    console.log(diet);
  };

  const renderTextFields = (id) => {
    const textFields = [];

    for (let i = 0; i < dietArr.length; i++) {
      textFields.push(
        <View key={i} style={StylesLocal.dynamicTextFieldContainer}>
          <TextInput
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            label={insertLabel("Food", StylesLocal.inputLabel)}
            style={StylesLocal.inputFieldDual}
            key={i}
            placeholder={`insert item`}
            value={dietArr[i].field1}
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
            value={dietArr[i].field2}
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
    setDietArrLen(dietArrLen + 1);
    setDietArr([...dietArr, { field1: "", field2: "" }]);
  };

  const handleDeleteTextField = (index) => {
    const newValues = [...dietArr];
    newValues.splice(index, 1);
    setDietArr(newValues);
    setDietArrLen(dietArrLen - 1);
  };

  const handleTextFieldChange = (text, index, field) => {
    const newValues = [...dietArr];
    newValues[index][field] = text;
    setDietArr(newValues);
  };

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  const iconSetter = (iconName) => {
    return (
      //used to set icons in the tab bar
      <Icon color={"#138D75"} type="MaterialIcons" name={iconName} size={30} />
    );
  };

  hideAlert = () => {
    setShowAlert(false);
  };

  openAlert = () => {
    if (name == "" || desc == "" || instruct == "") {
      setShowAlert(true);
    } else if (!checkAllFieldsNotNull()) {
      setShowAlert(true);
    } else {
      updateDiet();
    }
  };

  const checkAllFieldsNotNull = () => {
    for (let i = 0; i < dietArr.length; i++) {
      const obj = dietArr[i];
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
        <Text style={StylesLocal.cardTitle}>Edit diet plan</Text>
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
          style={Styles.buttonProceedConfirm}
          onPress={() => openAlert()}
        >
          <Text style={Styles.text}> Confirm Edit</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default EditDietNew;
