import { View, Text, Button, SafeAreaView } from 'react-native';
import AppStyles from '../styles/AppStyles';
import { auth } from "../firebase";
import { sendEmailVerification, signOut } from 'firebase/auth';
import InlineTextButton from '../components/inlineTextButton';


export default function ToDo({ navigation, route }) {
    let logout = () => {
        signOut(auth).then(() => {
            navigation.popToTop();
        });
    }

    let showContent = () => { };

    let showSendVerificationEmail = () => {
        return (
            <View>
                <Text>Please verify your email to use ToDo.</Text>
                <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
            </View>

        )
    }
    return (
        <SafeAreaView style={AppStyles.container}>
            <View style={[AppStyles.rowContainer, AppStyles.rightAligned]}>
                <InlineTextButton text="Manage Account" color="#258ea6" />
            </View>
            <Text style={AppStyles.header}>ToDo</Text>
            {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
        </SafeAreaView>
    )
}