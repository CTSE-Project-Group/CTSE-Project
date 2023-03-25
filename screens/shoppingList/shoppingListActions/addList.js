import { Button as Btn } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { db, auth } from "../../../firebase";
import { Styles } from "../../../styles/CardStyles";
import DefaultScreenStyles from "../../../styles/DefaultScreenStyles";
import { StylesLocal } from "../../../styles/LocalStyles";
import { Button, Card, TextInput, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
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
  
  // Functional component named AddListNew that takes a navigation and props object as a parameter
  const AddListNew = ({ navigation, props }) => {

  // Initializing state variables using the useState hook
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [instruct, setInstruct] = useState("");
    
  // Function to add shopping list to Firestore
    let addshoppingList = () => {
      const dbRef = collection(db, "shLists");
      const data = {
        shlistUser: auth.currentUser.uid,
        shlistUserName: auth.currentUser.displayName,
        shlistName: name,
        shlistDesc: desc,
        shlistIns: instruct,
        isShared: false,
      };
  
      console.log(data);
  // Adding document to Firestore
      addDoc(dbRef, data)
        .then((docRef) => {
          console.log("Document has been added successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const logger = () => {
      console.log("click", auth.currentUser.uid);
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
    
  // Render method
    return (
      <Card style={Styles.cardContainer}>
        {/* <Card.Title style={Styles.cardTitleStyle}>EEEE</Card.Title> */}
        <Card.Content style={Styles.cardContent}>
          <Text style={StylesLocal.cardTitle}>Add Shopping Details</Text>
          <ScrollView style={Styles.scrollViewBasicStyle}>
            <View>
              <View style={StylesLocal.staticTextView}>
                <Text style={StylesLocal.staticTextViewTitle}>Shopping item info</Text>
                <TextInput
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  label={insertLabel("Shopping Item name", StylesLocal.inputLabel)}
                  placeholder="insert Shopping Item name"
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
                  maxLength={50}
                />
  
                <TextInput
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  label={insertLabel("Quentity", StylesLocal.inputLabel)}
                  placeholder="insert Quentity"
                  onChangeText={setInstruct}
                  value={instruct}
                  style={StylesLocal.inputField}
                  maxLength={50}
                />
              </View>
              {/* {renderTextViews("Foods")} */}
            </View>
          </ScrollView>
        </Card.Content>
        <Card.Actions style={Styles.cardActionsStyle}>
          <Button
            uppercase={false}
            style={Styles.buttonProceed}
            onPress={addshoppingList}
          >
            <Text style={Styles.text}> Proceed</Text>
          </Button>
        </Card.Actions>
      </Card>
    );
  };

export default AddListNew;