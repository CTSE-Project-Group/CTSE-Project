import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventManagerHome from "./eventManagerHome/eventManagerHome";
import EventManagerViewEvent from "./eventManagerHome/eventManagerViewEvent";

const Stack = createNativeStackNavigator();

export default function EventManagerHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventHome"
        component={EventManagerHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventView"
        component={EventManagerViewEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
