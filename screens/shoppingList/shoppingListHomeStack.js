import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShoppingListHome from "./shoppingListHome/shoppingListHome";
import ShoppingListViewList from "./shoppingListHome/shoppingListViewList";

const Stack = createNativeStackNavigator();

export default function ShoppingListHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListHome"
        component={ShoppingListHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListView"
        component={ShoppingListViewList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}