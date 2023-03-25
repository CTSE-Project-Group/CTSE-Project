import { View, Text, Button, SafeAreaView, TextInput } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { auth, db } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export default function CreateUserName({ navigation, route }) {
  let [username, setUserName] = useState("");

  let createUser = () => {
    const { userID, userEmail } = route.params;
    const data = {
      email: userEmail,
      name: username,
      username: "UserUser",
      myArray: [],
    };

    setDoc(doc(db, "users", userID), data)
      .then(() => {
        console.log("USer Ceated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let proceed = () => {
    if (username == "") return;
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then((dat) => {
        console.log(dat);
        createUser();
        navigation.navigate("MyTabs");
      })
      .catch((error) => {
        console.log("Error updating display name: ", error);
      });
  };

  return (
    <View style={AppStyles.container}>
      <Text>Please insert a username</Text>
      <View>
        <TextInput
          placeholder="user name"
          placeholderTextColor="#BEBEBE"
          value={username}
          onChangeText={setUserName}
        />
      </View>
      <Button title="Proceed" onPress={proceed} color="#f7b267" />
    </View>
  );
}
