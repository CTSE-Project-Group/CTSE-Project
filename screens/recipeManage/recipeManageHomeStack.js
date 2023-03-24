import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeManageHome from "./recipeManageHome/recipeManagerHome";
import RecipeManagerViewRecipe from "./recipeManageHome/recipeManagerViewRecipe";

const Stack = createNativeStackNavigator();

export default function RecipeManageHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecipeHome"
        component={RecipeManageHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeView"
        component={RecipeManagerViewRecipe}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
