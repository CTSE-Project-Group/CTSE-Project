import { Button } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { auth, db } from "../../firebase";
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
import DefaultScreenStyles from "../../styles/DefaultScreenStyles";

export default function MyProfile({ navigation, props }) {
  let getUser = async () => {
    try {
      const q = query(collection(db, "diets"));
      const querySnapshot = await getDocs(q);
      let toDos = [];
      querySnapshot.forEach((doc) => {
        let toDo = doc.data();
        toDo.id = doc.id;
        toDos.push(toDo);

        console.log(toDos);
      });
    } catch (e) {
      console.log(e);
    }
  };

  let updateUser = () => {
    const docRef = doc(db, "users", "FOmsGaJFbpUr5bpnjd7wCE78ksu2");
    const data = {
      email: "fsdafaf",
      name: "fffffffffffffffffff",
      username: "hbdshbchsdb",
    };

    updateDoc(docRef, data)
      .then((docRef) => {
        console.log(
          "Value of an Existing Document Field has been updated",
          docRef
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = () => {
    deleteDoc(doc(db, "users", "LAfgfdgsgfgff"))
      .then(() => {
        console.log("Doc Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let setUser = () => {
    const data = {
      email: "fsdafaf",
      name: "fffffffffffffffffff",
      username: "hbdshbchsdb",
    };

    setDoc(doc(db, "users", "LAfgfdgsgfgff"), data)
      .then(() => {
        console.log("Doc Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={DefaultScreenStyles.container}>
      <Button>My Recipies</Button>
      <Button onPress={() => navigation.navigate("MealPLannerStack")}>
        My Diets
      </Button>
      <Button>My Shopping lists</Button>
      <Button>Events</Button>
      <Button color="#f7b267" onPress={deleteUser}>
        Logout
      </Button>
      {/* link relevant stack screen to buttons */}
    </View>
  );
}
