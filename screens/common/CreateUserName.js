import { View, Text, Button, SafeAreaView, TextInput } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { auth } from "../../firebase";
import {
  sendEmailVerification,
  signOut,
  UserCredential,
  updateProfile,
  getAuth,
} from "firebase/auth";
import InlineTextButton from "../../components/elements/inlineTextButton";
import MyTabs from "../../components/navigators/TabNavigator";
import { useState, useEffect } from "react";

export default function CreateUserName({ navigation, route }) {
  let [username, setUserName] = useState("");

  let proceed = () => {
    if (username == "") return;
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
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
