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

const EditListNew = ({ navigation, route }) => {
  const [dietID, setDietId] = useState("");
  const [instruct, setInstruct] = useState("");
  const [dietArrLen, setDietArrLen] = useState(0);
  const [dietArr, setDietArr] = useState([{ field1: "", field2: "" }]);
  const [diet, setDiet] = useState();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    getDiet();
  }, []);

  const getDiet = async () => {
    const docRef = doc(db, "shLists", route.params);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      const data = docSnap.data();
      const id = docSnap.id;
      //setDietId(id);
      //setDiet(data);
      setName(data.shlistName);
      setDesc(data.shlistDesc);
      setInstruct(data.shlistIns);
    } else {
      console.log("No such document!");
    }
  };

  let updateDiet = () => {
    const data = {
      shlistUser: diet.dietUser,
      shlistUserName: diet.dietUserName,
      shlistName: name,
      shlistDesc: desc,
      shlistIns: instruct,
      isShared: false,
    };

    const docRef = doc(db, "shLists", route.params);
    setDoc(docRef, data)
      .then(() => {
        console.log("Doc Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logger = () => {
    console.log(diet);
  };

  const handleAddTextField = () => {
    setDietArrLen(dietArrLen + 1);
    setDietArr([...dietArr, { field1: "", field2: "" }]);
  };

  const handleDeleteTextField = (index) => {
    const newValues = [...dietArr];
    newValues.splice(index, 1);
    setDietArr(newValues);
    setDietArrLen(dietArrLen - 1);
  };

  const handleTextFieldChange = (text, index, field) => {
    const newValues = [...dietArr];
    newValues[index][field] = text;
    setDietArr(newValues);
  };

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  hideAlert = () => {
    setShowAlert(false);
  };

  openAlert = () => {
    if (name == "" || desc == "" || instruct == "") {
      setShowAlert(true);
    } else if (!checkAllFieldsNotNull()) {
      setShowAlert(true);
    } else {
      updateDiet();
    }
  };

  const checkAllFieldsNotNull = () => {
    for (let i = 0; i < dietArr.length; i++) {
      const obj = dietArr[i];
      if (obj.field1 == "" || obj.field2 == "") {
        return false;
      }
    }
    return true;
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
        <Text style={StylesLocal.cardTitle}>Edit diet plan</Text>
        <ScrollView style={Styles.scrollViewBasicStyle}>
          <View>
            <View style={StylesLocal.staticTextView}>
              <Text style={StylesLocal.staticTextViewTitle}>Diet info</Text>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Shopping item name", StylesLocal.inputLabel)}
                placeholder="insert item name"
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
                label={insertLabel("Quantity", StylesLocal.inputLabel)}
                placeholder="insert Quantity"
                onChangeText={setInstruct}
                value={instruct}
                style={StylesLocal.inputField}
                maxLength={100}
                multiline={true}
              />
            </View>
            {/* {renderTextViews("Foods")} */}
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

export default EditListNew;
