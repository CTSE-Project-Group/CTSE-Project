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

const EditRecipeNew = ({ navigation, route }) => {
  const [recipeID, setRecipeId] = useState("");
  const [recipeArrLen, setRecipeArrLen] = useState(0);
  const [recipeArr, setRecipeArr] = useState([{ field1: "", field2: "" }]);
  const [recipe, setRecipe] = useState();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    const docRef = doc(db, "recipe", route.params);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      const data = docSnap.data();
      const id = docSnap.id;
      setRecipeId(id);
      setRecipe(data);
      setName(data.recipeName);
      setDesc(data.recipeDesc);
      setPrice(data.recipePrice);
      setRecipeArrLen(data.recipeIngredients.length);
      setRecipeArr(data.recipeIngredients);
    } else {
      console.log("No such document!");
    }
  };

  let updateRecipe = () => {
    const data = {
      recipeUser: recipe.recipeUser,
      recipeUserName: recipe.recipeUserName,
      recipeName: name,
      recipeDesc: desc,
      recipePrice: price,
      recipeIngredients: recipeArr,
      isShared: false,
    };

    const docRef = doc(db, "recipes", route.params);
    setDoc(docRef, data)
      .then(() => {
        console.log("Doc Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logger = () => {
    console.log(recipe);
  };

  const handleAddTextField = () => {
    setRecipeArrLen(recipeArrLen + 1);
    setRecipeArr([...recipeArr, { field1: "", field2: "" }]);
  };

  const handleDeleteTextField = (index) => {
    const newValues = [...recipeArr];
    newValues.splice(index, 1);
    setRecipeArr(newValues);
    setRecipeArrLen(recipeArrLen - 1);
  };

  const handleTextFieldChange = (text, index, field) => {
    const newValues = [...recipeArr];
    newValues[index][field] = text;
    setRecipeArr(newValues);
  };

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  hideAlert = () => {
    setShowAlert(false);
  };

  openAlert = () => {
    if (name == "" || desc == "" || price == "") {
      setShowAlert(true);
    } else if (!checkAllFieldsNotNull()) {
      setShowAlert(true);
    } else {
      updateRecipe();
    }
  };

  const checkAllFieldsNotNull = () => {
    for (let i = 0; i < recipeArr.length; i++) {
      const obj = recipeArr[i];
      if (obj.field1 == "" || obj.field2 == "") {
        return false;
      }
    }
    return true;
  };

  const renderTextFields = (id) => {
    const textFields = [];

    for (let i = 0; i < recipeArr.length; i++) {
      textFields.push(
        <View key={i} style={StylesLocal.dynamicTextFieldContainer}>
          <TextInput
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            label={insertLabel("Ingredients", StylesLocal.inputLabel)}
            style={StylesLocal.inputFieldDual}
            key={i}
            placeholder={`insert item`}
            value={recipeArr[i].field1}
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
            value={recipeArr[i].field2}
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

  const iconSetter = (iconName) => {
    return (
      //used to set icons in the tab bar
      <Icon color={"#138D75"} type="MaterialIcons" name={iconName} size={30} />
    );
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

  return (
    <Card style={Styles.cardContainer}>
      {/* <Card.Title style={Styles.cardTitleStyle}>EEEE</Card.Title> */}
      <Card.Content style={Styles.cardContent}>
        <Text style={StylesLocal.cardTitle}>Edit recipe plan</Text>
        <ScrollView style={Styles.scrollViewBasicStyle}>
          <View>
            <View style={StylesLocal.staticTextView}>
              <Text style={StylesLocal.staticTextViewTitle}>recipe info</Text>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("recipe name", StylesLocal.inputLabel)}
                placeholder="insert recipe name"
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
                label={insertLabel("{Price", StylesLocal.inputLabel)}
                placeholder="insert Price"
                onChangeText={setPrice}
                value={price}
                style={StylesLocal.inputField}
                maxLength={100}
                multiline={true}
              />
            </View>
            {renderTextViews("Ingredients")}
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

export default EditRecipeNew;
