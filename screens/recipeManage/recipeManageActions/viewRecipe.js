import { Button as Btn } from "@rneui/base";
import React, { useState,useEffect } from "react";
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
  deleteDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { RecipeStylesLocal } from "./LocalStyles";
import { RecipeMainStyles } from "./MainStyles";

const ViewRecipe = ({ navigation, route }) => {
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [validUser, setValidUser] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  
  const recipe = route.params;

  useEffect(() => {
    setValidUser(route.params.recipeUser == auth.currentUser.uid);
    setDesc(recipe.recipeDesc);
    setPrice(recipe.recipePrice);
  }, []);

  let updateUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(docRef, {
        myArray: arrayRemove(recipe.recipeId),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRecipe = () => {
    const docRef = doc(db, "recipe", recipe.recipeId);
    deleteDoc(docRef)
      .then(() => {
        console.log("Doc Deleted");
        updateUser();
      })
      .catch((error) => {
        console.log(error);
      });
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

  const logger = () => {
    console.log("ee", validUser);
  };

  const handleEditClicked = () => {
    setIsEditClicked(true);
    setIsEditable(true);
  };

  const handleConfirmClicked = () => {
    setIsEditClicked(false);
    setIsEditable(false);
  };

  return (
    <Card style={RecipeMainStyles.cardContainer}>
      <Card.Content style={RecipeMainStyles.cardContentSmall}>
        <Text style={RecipeStylesLocal.cardTitle}>My recipe info</Text>
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
                style={RecipeStylesLocal.inputField}
                maxLength={50}
                editable={isEditable}
              />
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Price", RecipeStylesLocal.inputLabel)}
                placeholder="insert price"
                value={recipe.recipePrice}
                style={RecipeStylesLocal.inputField}
                multiline={true}
                editable={isEditable}
              />
            </View>
            <View style={RecipeStylesLocal.dynamicTextFieldOuterContainer}>
              {recipe.recipeIngredients &&
                recipe.recipeIngredients.map((Ingredients, i) => (
                <View 
                  key={i} 
                  style={RecipeStylesLocal.dynamicTextFieldContainer}
                  >
                  <TextInput
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    label={insertLabel("Ingredients", RecipeStylesLocal.inputLabel)}
                    style={RecipeStylesLocal.inputFieldDual}
                    value={Ingredients.field1}
                    editable={isEditable}
                  />
                  <TextInput
                    keyboardType="numeric"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    label={insertLabel(
                      "Quantity(grams)", 
                      RecipeStylesLocal.inputLabel
                      )}
                    style={RecipeStylesLocal.inputFieldDua2}
                    value={Ingredients.field2}
                    editable={isEditable}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </Card.Content>
      {!validUser ? (
        <Card.Actions style={RecipeMainStyles.cardAction12}>
          <Button
            uppercase={false}
            style={RecipeMainStyles.buttonProceed}
            onPress={updateUser}
          >
            <Text style={RecipeMainStyles.text}>Remove from My diets</Text>
          </Button>
        </Card.Actions>
      ) : isEditClicked ? (
      <Card.Actions style={RecipeMainStyles.cardActionsRowStyle}>
        <Button
          uppercase={false}
          style={RecipeMainStyles.buttonEdit}
          onPress={handleConfirmClicked}
        >
          <Text style={RecipeMainStyles.text}>Confirm Edit</Text>
        </Button>
      </Card.Actions>
      ) : ( 
        <Card.Actions style={RecipeMainStyles.cardActionsRowStyle}>
        <Button
          uppercase={false}
          style={RecipeMainStyles.buttonEdit}
          onPress={() => navigation.navigate("EditRecipe", recipe.recipeId)}
        >
          <Text style={RecipeMainStyles.text}>Edit</Text>
        </Button>
        <Button
          uppercase={false}
          style={RecipeMainStyles.buttonDelete}
          onPress={deleteRecipe}
        >
          <Text style={RecipeMainStyles.text}>Delete</Text>
        </Button>
      </Card.Actions>
      )}
    </Card>
  );
};

export default ViewRecipe;
