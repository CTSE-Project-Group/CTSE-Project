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
  deleteDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { DietStylesLocal } from "./LocalStyles";
import { DietMainStyles } from "./MainStyles";

const ViewList = ({ navigation, route }) => {
  const [desc, setDesc] = useState("");
  const [instruct, setInstruct] = useState("");
  const [name, setName] = useState("");
  const [validUser, setValidUser] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const diet = route.params;

  useEffect(() => {
    setValidUser(route.params.dietUser == auth.currentUser.uid);
    setDesc(diet.dietDesc);
    setName(diet.dietName)
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

  const deleteList = () => {
    const docRef = doc(db, "shLists", diet.dietId);
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
    <Card style={DietMainStyles.cardContainer}>
      <Card.Content style={DietMainStyles.cardContentSmall}>
        <Text style={DietStylesLocal.cardTitle}>My Shopping List info</Text>
        <ScrollView style={DietMainStyles.scrollViewBasicStyle}>
          <View>
            <View style={DietStylesLocal.staticTextView}>
              <View style={{ flexDirection: "row", left: 5 }}>
                <Text style={DietStylesLocal.staticTextViewTitle}>
                  {diet.dietName}
                </Text>
                <Text style={DietStylesLocal.staticTextViewAuthor}>
                  {" by " + diet.shlistUserName}
                </Text>
              </View>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Shopping Item name", DietStylesLocal.inputLabel)}
                placeholder="insert Shopping Item name"
                value={diet.shlistName}
                style={DietStylesLocal.inputField}
                maxLength={50}
                editable={isEditable}
              />
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Quentity", DietStylesLocal.inputLabel)}
                placeholder="insert Quentity"
                value={diet.shlistIns}
                style={DietStylesLocal.inputField}
                multiline={true}
                editable={isEditable}
              />
            </View>
          </View>
        </ScrollView>
      </Card.Content>
      
        <Card.Actions style={DietMainStyles.cardActionsRowStyle}>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonEdit}
            onPress={() => navigation.navigate("EditList", diet.dietId)}
          >
            <Text style={DietMainStyles.text}>Edit</Text>
          </Button>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonDelete}
            onPress={deleteList}
          >
            <Text style={DietMainStyles.text}>Delete</Text>
          </Button>
        </Card.Actions>

    </Card>
  );
};

export default ViewList;