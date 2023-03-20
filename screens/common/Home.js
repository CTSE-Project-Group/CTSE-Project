import { View, Text, Button, SafeAreaView } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { auth } from "../../firebase";
import { sendEmailVerification, signOut } from "firebase/auth";
import InlineTextButton from "../../components/elements/inlineTextButton";
import MyTabs from "../../components/navigators/TabNavigator";

export default function Home({ navigation, route }) {
  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  };

  console.log(auth.currentUser.emailVerified);

  let showContent = () => {
    return (
      <View>
        <Text>This is Home</Text>
      </View>
    );
  };

  let showSendVerificationEmail = () => {
    return (
      <View>
        <Text>Please verify your email to use Home.</Text>
        <Button
          title="Send Verification Email"
          onPress={() => sendEmailVerification(auth.currentUser)}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={[AppStyles.rowContainer, AppStyles.rightAligned]}>
        <InlineTextButton text="Manage Account" color="#258ea6" />
      </View>
      <Text style={AppStyles.header}>Homes</Text>
      {auth.currentUser.emailVerified
        ? showContent()
        : showSendVerificationEmail()}
    </SafeAreaView>
  );
}
