import { Button } from "@rneui/base";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultScreenStyles from "../../styles/DefaultScreenStyles";
import MealPLannerStack from "../mealPlanner/mealPlannerStack";
import EventManagerStack from "../eventManager/eventManagerStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MyProfile from "./MyProfile";

export default function MyProfileStack() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="MealPLannerStack" component={MealPLannerStack} />
        <Stack.Screen name="EventManagerStack" component={EventManagerStack} />
        {/*create necessary files for the relevant function  <refer mealPlanner folder>
         Then create a stack using them .
         Import the stack here . 
         Then link the stack to a button in MyProfile.js  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
