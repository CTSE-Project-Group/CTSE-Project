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

const AddEventNew = ({ navigation, props }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  let addEvent = () => {
    const dbRef = collection(db, "events");
    const data = {
      eventUser: auth.currentUser.uid,
      eventName: name,
      eventDesc: desc,
      isShared: false,
    };

    console.log(data);

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

  return (
    <Card style={Styles.cardContainer}>
      {/* <Card.Title style={Styles.cardTitleStyle}>EEEE</Card.Title> */}
      <Card.Content style={Styles.cardContent}>
        <Text style={StylesLocal.cardTitle}>Add Event Details</Text>
        <ScrollView style={Styles.scrollViewBasicStyle}>
          <View>
            <View style={StylesLocal.staticTextView}>
              <Text style={StylesLocal.staticTextViewTitle}>Event info</Text>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Event name", StylesLocal.inputLabel)}
                placeholder="insert event name"
                value={name}
                onChangeText={setName}
                style={StylesLocal.inputField}
                maxLength={20}
              />
              <View>
                <TextInput
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  label={insertLabel("Description", StylesLocal.inputLabel)}
                  placeholder="insert description"
                  value={desc}
                  onChangeText={setDesc}
                  style={StylesLocal.inputField}
                  multiline={true}
                  numberOfLines={8}
                  maxLength={100}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Card.Content>
      <Card.Actions style={Styles.cardActionsStyle}>
        <Button
          uppercase={false}
          style={Styles.buttonProceed}
          onPress={addEvent}
        >
          <Text style={Styles.text}> Proceed</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default AddEventNew;