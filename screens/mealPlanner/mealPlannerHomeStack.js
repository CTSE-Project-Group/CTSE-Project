import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealPlannerHome from "./mealPlannerHome/mealPlannerHome";
import MealPlannerViewDiet from "./mealPlannerHome/mealPlannerViewDiet";

const Stack = createNativeStackNavigator();

export default function MealPLannerHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DietHome"
        component={MealPlannerHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DietView"
        component={MealPlannerViewDiet}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
