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
import { DietStylesLocal } from "./LocalStyles";
import { DietMainStyles } from "./MainStyles";

const AddListNew = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [instruct, setInstruct] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const diet = route.params;

  let updateUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(docRef, {
        myArray: arrayUnion(diet.dietId),
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
    <Card style={DietMainStyles.cardContainer}>
      <Card.Content style={DietMainStyles.cardContent}>
        <Text style={DietStylesLocal.cardTitle}>Shopping List info</Text>
        <ScrollView style={DietMainStyles.scrollViewBasicStyle}>
          <View>
            <View style={DietStylesLocal.staticTextView}>
              <View style={{ flexDirection: "row", left: 5 }}>
                <Text style={DietStylesLocal.staticTextViewTitle}>
                  {diet.shlistName}
                </Text>
                <Text style={DietStylesLocal.staticTextViewAuthor}>
                  {" by " + diet.shlistUserName}
                </Text>
              </View>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Description", DietStylesLocal.inputLabel)}
                placeholder="insert description"
                value={diet.shlistDesc}
                onChangeText={setDesc}
                style={DietStylesLocal.inputField}
                maxLength={50}
                editable={false}
              />
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Quentity", DietStylesLocal.inputLabel)}
                placeholder="insert Quentity"
                onChangeText={setInstruct}
                value={diet.shlistIns}
                style={DietStylesLocal.inputField}
                multiline={true}
                editable={false}
              />
            </View>
          </View>
        </ScrollView>
      </Card.Content>
      <Card.Actions style={DietMainStyles.cardActionsStyle}>
        <Button
          uppercase={false}
          style={DietMainStyles.buttonProceedGreen}
          onPress={updateUser}
        >
          <Text style={DietMainStyles.text}>Add to My Shopping List</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default AddListNew;
