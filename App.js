import { StatusBar } from "expo-status-bar";
import Login from "./screens/user/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./screens/user/SignUp";
import ResetPassword from "./screens/user/ResetPassword";
import ToDo from "./screens/todo/ToDo";
import Home from "./screens/common/Home";
import Recipe from "./screens/recipe/Recipe";
import AddRecipe from "./screens/recipe/AddRecipe";
import RecipeDetails from "./screens/recipe/RecipeDetails";
import MyTabs from "./components/navigators/TabNavigator";
import CreateUserName from "./screens/common/CreateUserName";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateUserName"
          component={CreateUserName}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen 
        name="AddRecipe" 
        component={AddRecipe} 
        options={{ title: 'Add recipe' }}
      /> */}
      <Stack.Screen 
        name="Recipe" 
        component={Recipe} 
        options={{ title: 'Recipe List' }}
      />
      <Stack.Screen 
        name="RecipeDetails" 
        component={RecipeDetails} 
        options={{ title: 'Recipe Details' }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
