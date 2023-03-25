import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddList from "./shoppingListActions/addList";
import MyList from "./shoppingListActions/myList";
import ViewList from "./shoppingListActions/viewList";
import EditListNew from "./shoppingListActions/editList";

const Stack = createNativeStackNavigator();

export default function ShoppingListStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="MyList"
        component={MyList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddList"
        component={AddList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewList"
        component={ViewList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditList"
        component={EditListNew}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}