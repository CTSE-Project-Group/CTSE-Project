import { Button as Btn } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { db, auth } from "../../../firebase";
import { Button, Card, TextInput, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  collection,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { RecipeStylesLocal } from "./LocalStyles";
import { RecipeMainStyles } from "./MainStyles";

const AddRecipeNew = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [numberOfTextFields, setNumberOfTextFields] = useState(1);
  const [textFieldsValues, setTextFieldsValues] = useState([
    { field1: "", field2: "" },
  ]);

  const recipe = route.params;

  let updateUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(docRef, {
        myArray: arrayUnion(recipe.recipeId),
      });
    } catch (e) {
      console.log(e);
    }
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

  const color = { color: "red", fontSize: 19 };

  return (
    <Card style={RecipeMainStyles.cardActionsStyle}>
      <Card.Content style={RecipeMainStyles.cardContent}>
        <Text style={RecipeStylesLocal.cardTitle}>Recipe info</Text>
        <ScrollView style={RecipeMainStyles.scrollViewBasicStyle}>
          <View>
            <View style={RecipeStylesLocal.staticTextView}>
              <View style={{ flexDirection: "row", left: 5 }}>
                <Text style={RecipeStylesLocal.staticTextViewTitle}>
                  {recipe.recipeName}
                </Text>
                <Text style={RecipeStylesLocal.staticTextViewAuthor}>
                  {" by " + recipe.recipeUserName}
                </Text>
              </View>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Description", RecipeStylesLocal.inputLabel)}
                placeholder="insert description"
                value={recipe.recipeDesc}
                onChangeText={setDesc}
                style={RecipeStylesLocal.inputField}
                maxLength={50}
                editable={false}
              />
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Price", RecipeStylesLocal.inputLabel)}
                placeholder="insert price"
                onChangeText={setPrice}
                value={recipe.recipePrice}
                style={RecipeStylesLocal.inputField}
                multiline={true}
                editable={false}
              />
            </View>
            <View style={RecipeStylesLocal.dynamicTextFieldOuterContainer}>
              {recipe.recipeIngredients.map((Ingredients, i) => (
                <View key={i} style={RecipeStylesLocal.dynamicTextFieldContainer}>
                  <TextInput
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    label={insertLabel("Ingredients", RecipeStylesLocal.inputLabel)}
                    style={RecipeStylesLocal.inputFieldDual}
                    value={Ingredients.field1}
                    editable={false}
                  />
                  <TextInput
                    keyboardType="numeric"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    label={insertLabel("Quantity", RecipeStylesLocal.inputLabel)}
                    style={RecipeStylesLocal.inputFieldDua2}
                    value={Ingredients.field2}
                    editable={false}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </Card.Content>
      <Card.Actions style={RecipeMainStyles.cardActionsStyle}>
        <Button
          uppercase={false}
          style={RecipeMainStyles.buttonProceedGreen}
          onPress={updateUser}
        >
          <Text style={RecipeMainStyles.text}>Add to My recipes</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default AddRecipeNew;
