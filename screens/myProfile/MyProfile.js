import { Button, Card, TextInput, Text } from "react-native-paper";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
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

function MyProfile({ navigation, props }) {
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

  const buttonStyleSetter = (color, ...other) => {
    console.log(other[2]);
    return {
      fontSize: 6,
      width: "100%",
      height: other[0] ? other[2] : "10%",
      alignSelf: "center",
      justifyContent: "center",
      marginBottom: 3,
      backgroundColor: color,
      borderRadius: 7,
      borderColor: "white",
      top: other[1],
    };
  };

  return (
    <View style={DefaultScreenStyles.container}>
      <Button
        style={buttonStyleSetter("#AF7AC5")}
        onPress={() => navigation.navigate("RecipeManageStack")}
      >
        <Text style={Styles.text}>My Recipies</Text>
      </Button>
      <Button
        style={buttonStyleSetter("#F5B041")}
        onPress={() => navigation.navigate("MealPLannerStack")}
      >
        <Text style={Styles.text}> My Diets</Text>
      </Button>
      <Button style={buttonStyleSetter("#48C9B0")}>
        <Text style={Styles.text}>My Shopping</Text>
      </Button>
      <Button
        style={buttonStyleSetter("#5499C7")}
        onPress={() => navigation.navigate("EventManagerStack")}
      >
        <Text style={Styles.text}>My Events</Text>
      </Button>
      <Button
        style={buttonStyleSetter("#C0392B", true, 150, "7%")}
        onPress={deleteUser}
      >
        <Text style={Styles.text}>Logout</Text>
      </Button>
      {/* link relevant stack screen to buttons */}
    </View>
  );
}
const Styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonProceed: {
    fontSize: 6,
    width: "100%",
    height: "10%",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 1,
    backgroundColor: "#E74C3C",
    borderRadius: 7,
    borderColor: "white",
  },
});

export default MyProfile;
