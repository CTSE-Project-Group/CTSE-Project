import { Button as Btn } from "@rneui/base";
import React, { useEffect, useState } from "react";
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
  arrayRemove,
} from "firebase/firestore";
import { DietStylesLocal } from "./LocalStyles";
import { DietMainStyles } from "./MainStyles";

const ViewDiet = ({ navigation, route }) => {
  const [desc, setDesc] = useState("");
  const [instruct, setInstruct] = useState("");
  const [validUser, setValidUser] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const diet = route.params;

  useEffect(() => {
    setValidUser(route.params.dietUser == auth.currentUser.uid);
    setDesc(diet.dietDesc);
    setInstruct(diet.dietIns);
  }, []);

  let updateUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(docRef, {
        myArray: arrayRemove(diet.dietId),
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
    <Card style={DietMainStyles.cardContainer}>
      <Card.Content style={DietMainStyles.cardContentSmall}>
        <Text style={DietStylesLocal.cardTitle}>My diet info</Text>
        <ScrollView style={DietMainStyles.scrollViewBasicStyle}>
          <View>
            <View style={DietStylesLocal.staticTextView}>
              <View style={{ flexDirection: "row", left: 5 }}>
                <Text style={DietStylesLocal.staticTextViewTitle}>
                  {diet.dietName}
                </Text>
                <Text style={DietStylesLocal.staticTextViewAuthor}>
                  {" by " + diet.dietUserName}
                </Text>
              </View>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Description", DietStylesLocal.inputLabel)}
                placeholder="insert description"
                value={diet.dietDesc}
                style={DietStylesLocal.inputField}
                maxLength={50}
                editable={isEditable}
              />
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Instructions", DietStylesLocal.inputLabel)}
                placeholder="insert instructions"
                value={diet.dietIns}
                style={DietStylesLocal.inputField}
                multiline={true}
                editable={isEditable}
              />
            </View>
            <View style={DietStylesLocal.dynamicTextFieldOuterContainer}>
              {diet.dietFoods.map((food, i) => (
                <View key={i} style={DietStylesLocal.dynamicTextFieldContainer}>
                  <TextInput
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    label={insertLabel("Food", DietStylesLocal.inputLabel)}
                    style={DietStylesLocal.inputFieldDual}
                    value={food.field1}
                    editable={isEditable}
                  />
                  <TextInput
                    keyboardType="numeric"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    label={insertLabel("Quantity", DietStylesLocal.inputLabel)}
                    style={DietStylesLocal.inputFieldDua2}
                    value={food.field2}
                    editable={isEditable}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </Card.Content>
      {!validUser ? (
        <Card.Actions style={DietMainStyles.cardActionsStyle}>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonProceed}
            onPress={updateUser}
          >
            <Text style={DietMainStyles.text}>Remove from My diets</Text>
          </Button>
        </Card.Actions>
      ) : isEditClicked ? (
        <Card.Actions style={DietMainStyles.cardActionsStyle}>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonProceedEdit}
            onPress={handleConfirmClicked}
          >
            <Text style={DietMainStyles.text}>Confirm edits</Text>
          </Button>
        </Card.Actions>
      ) : (
        <Card.Actions style={DietMainStyles.cardActionsRowStyle}>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonEdit}
            onPress={handleEditClicked}
          >
            <Text style={DietMainStyles.text}>Edit</Text>
          </Button>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonDelete}
            onPress={logger}
          >
            <Text style={DietMainStyles.text}>Delete</Text>
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

export default ViewDiet;
