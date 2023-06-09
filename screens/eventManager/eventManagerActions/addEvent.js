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
  arrayUnion,
} from "firebase/firestore";

const AddEventNew = ({ navigation, props }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  let updateUser = async (eventId) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(docRef, {
        myArray: arrayUnion(eventId),
      }).then(() => {
        console.log("updated with", eventId);
      });
    } catch (e) {
      console.log(e);
    }
  };

  let addEvent = () => {
    const dbRef = collection(db, "events");
    const data = {
      eventUser: auth.currentUser.uid,
      eventUserName: auth.currentUser.displayName,
      eventName: name,
      eventDesc: desc,
      isShared: false,
    };

    addDoc(dbRef, data)
      .then((docRef) => {
        updateUser(docRef.id);
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logger = () => {
    console.log("click", auth.currentUser.displayName);
  };

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

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  const iconSetter = (iconName) => {
    return (
      //used to set icons in the tab bar
      <Icon color={"#138D75"} type="MaterialIcons" name={iconName} size={30} />
    );
  };

  openAlert = () => {
    if (name == "" || desc == "") {
      setShowAlert(true);
    } else {
      addEvent();
    }
  };

  hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <Card style={Styles.cardContainer}>
      {/* <Card.Title style={Styles.cardTitleStyle}>EEEE</Card.Title> */}
      <Card.Content style={Styles.cardContent}>
        <Text style={StylesLocal.cardTitle}>Create event</Text>
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

            </View>
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

export default AddEventNew;
