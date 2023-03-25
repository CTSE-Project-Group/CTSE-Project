import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddRecipe from "./recipeManageActions/addRecipe";
import MyRecipe from "./recipeManageActions/myRecipe";
import ViewRecipe from "./recipeManageActions/viewRecipe";
import EditRecipeNew from "./recipeManageActions/editRecipe"

const Stack = createNativeStackNavigator();

export default function RecipeManageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyRecipe"
        component={MyRecipe}
        options={{ headerShown: false }}
      />
      {<Stack.Screen
        name="AddRecipe"
        component={AddRecipe}
        options={{ headerShown: false }}
      /> }
      {<Stack.Screen
        name="ViewRecipe"
        component={ViewRecipe}
        options={{ headerShown: false }}
      /> }
       {<Stack.Screen
        name="EditRecipe"
        component={EditRecipeNew}
        options={{ headerShown: false }}
      /> }
    </Stack.Navigator>
  );
}
