import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDiet from "./mealPlannerActions/addDiet";
import AddDietNew from "./mealPlannerActions/addDietNew";
import MyDiets from "./mealPlannerActions/myDiets";
import ViewDiet from "./mealPlannerActions/viewDiet";

const Stack = createNativeStackNavigator();

export default function MealPLannerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddDiet"
        component={AddDietNew}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyDiets"
        component={MyDiets}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewDiet"
        component={ViewDiet}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
