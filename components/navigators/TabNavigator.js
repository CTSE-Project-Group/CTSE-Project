import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TestScreen from "../../screens/common/TestScreen";
import EventManagerHomeStack from "../../screens/eventManager/eventManagerHomeStack";
import { LogBox } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MyProfileStack from "../../screens/myProfile/MyProfileStack";
import MealPLannerHomeStack from "../../screens/mealPlanner/mealPlannerHomeStack";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Tab = createBottomTabNavigator();

const MyTabs = ({ navigation, props }) => {
  const nav = navigation;
  const pro = props;

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
            height: "08%",
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: "#fff",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: { fontSize: 12, display: "none" },
        })}
      >
        <Tab.Screen
          name="Home"
          component={MealPLannerHomeStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("home", focused);
            },
          }}
        />
        <Tab.Screen
          name="Recipies"
          component={TestScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("md-list-sharp", focused);
            },
          }}
        />
        <Tab.Screen
          name="Shopping"
          component={TestScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("ios-basket", focused);
            },
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventManagerHomeStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("calendar", focused);
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={MyProfileStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return iconSetter("person", focused);
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    // do not make any changes here !!!
  );
};

export default MyTabs;
