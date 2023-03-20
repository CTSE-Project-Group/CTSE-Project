import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import TestScreen from "../../screens/common/TestScreen";
import MealPlannerHome from "../../screens/mealPlanner/mealPlannerHome";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const iconSetter = (iconName, focused) => {
    return (
      //used to set icons in the tab bar
      <Icon
        color={focused ? "#347F42" : "#5A5A5A"}
        type="MaterialIcons"
        name={iconName}
        size={30}
      />
    );
  };

  const tintColor = "red";

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ focused }) => ({
          headerShown: false,
          tabBarInactiveTintColor: "#5A5A5A",
          tabBarActiveTintColor: "#347F42",
          tabBarStyle: {
            position: "absolute",
            borderColor: "black",
            fontSize: 10,
            height: "10%",
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: "#ECECEC",
          },
          tabBarLabelStyle: { fontSize: 12 },
        })}
      >
        <Tab.Screen
          name="Home"
          component={MealPlannerHome}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("home", focused);
            },
          }}
        />
        <Tab.Screen
          name="Travel"
          component={TestScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("directions-bus", focused);
            },
          }}
        />
        <Tab.Screen
          name="My Trips"
          component={TestScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("notes", focused);
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={TestScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("account-circle", focused);
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyTabs;
