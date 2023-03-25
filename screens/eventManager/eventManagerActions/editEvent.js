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

const EditEventNew = ({ navigation, route }) => {
  const [eventID, setEventId] = useState("");
  const [event, setEvent] = useState();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    const docRef = doc(db, "events", route.params);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      const data = docSnap.data();
      const id = docSnap.id;
      setEventId(id);
      setEvent(data);
      setName(data.eventName);
      setDesc(data.eventDesc);
    } else {
      console.log("No such document!");
    }
  };

  let updateEvent = () => {
    const data = {
      eventUser: event.eventUser,
      eventUserName: event.eventUserName,
      eventName: name,
      eventDesc: desc,
      isShared: false,
    };

    const docRef = doc(db, "events", route.params);
    setDoc(docRef, data)
      .then(() => {
        console.log("Doc Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logger = () => {
    console.log(event);
  };

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  hideAlert = () => {
    setShowAlert(false);
  };

  openAlert = () => {
    if (name == "" || desc == "") {
      setShowAlert(true);
    } else {
      updateEvent();
    }
  };

  const iconSetter = (iconName) => {
    return (
      //used to set icons in the tab bar
      <Icon color={"#138D75"} type="MaterialIcons" name={iconName} size={30} />
    );
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

  return (
    <Card style={Styles.cardContainer}>
      {/* <Card.Title style={Styles.cardTitleStyle}>EEEE</Card.Title> */}
      <Card.Content style={Styles.cardContent}>
        <Text style={StylesLocal.cardTitle}>Edit event</Text>
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
          style={Styles.buttonProceedConfirm}
          onPress={() => openAlert()}
        >
          <Text style={Styles.text}> Confirm Edit</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default EditEventNew;
