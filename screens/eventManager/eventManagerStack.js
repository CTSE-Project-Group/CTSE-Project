import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEvent from "./eventManagerActions/addEvent";
import EditEventNew from "./eventManagerActions/editEvent";
import MyEvents from "./eventManagerActions/myEvents";
import ViewEvent from "./eventManagerActions/viewEvent";

const Stack = createNativeStackNavigator();

export default function EventManagerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyEvents"
        component={MyEvents}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddEvent"
        component={AddEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewEvent"
        component={ViewEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEventNew}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
