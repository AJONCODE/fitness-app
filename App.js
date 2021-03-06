import * as React from "react";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Platform, StatusBar, View } from "react-native";
import { isReadyRef, navigationRef } from "./navigation/RootNavigation";
import { lightPurp, white } from "./utils/colors";

import AddEntry from "./components/AddEntry";
import Compass from "./components/Compass";
import Constants from "expo-constants";
import EntryDetail from "./components/EntryDetail";
import History from "./components/History";
import AddPic from "./components/AddPic";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import reducer from "./reducers/index";
import { setLocalNotification } from "./utils/helpers";

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "History") {
            iconName = focused ? "ios-bookmarks" : "ios-bookmarks-outline";
          } else if (route.name === "Compass") {
            iconName = focused ? "compass-sharp" : "compass-outline";
          } else if (route.name === "AddPic") {
            iconName = focused ? "images" : "images-outline";
          } else if (route.name === "AddEntry") {
            iconName = focused ? "plus-square" : "plus-square-o";
            return <FontAwesome name={iconName} size={size} color={color} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        navigationOptions: {
          header: null,
        },
        tabBarLabel: getHeaderTitle(route),
      })}
      tabBarOptions={{
        labelPosition: "below-icon",
        activeTintColor: Platform.OS === "ios" ? lightPurp : white,
        inactiveTintColor: "grey",
        style: {
          height: 56,
          backgroundColor: Platform.OS === "ios" ? white : lightPurp,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}
    >
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="AddEntry" component={AddEntry} />
      <Tab.Screen name="Compass" component={Compass} />
      <Tab.Screen name="AddPic" component={AddPic} />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.name || "";

  switch (routeName) {
    case "History":
      return "History";
    case "AddEntry":
      return "Add Entry";
    case "Compass":
      return "Compass";
    case "AddPic":
      return "Add Pic";
  }
}

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={MainTabNavigator}
        options={({ route }) => ({
          headerShown: false,
          headerTitle: getHeaderTitle(route),
          headerStyle: {
            backgroundColor: lightPurp,
          },
          headerTintColor: white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
        navigationOptions={{ headerTintColor: lightPurp }}
      />
      <Stack.Screen
        name="EntryDetail"
        component={EntryDetail}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: lightPurp,
          },
          headerTintColor: white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
      setLocalNotification();
    };
  }, []);

  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <AppStatusBar backgroundColor={lightPurp} barStyle="light-content" />
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}
        >
          {<MainStackNavigator />}
        </NavigationContainer>
      </View>
    </Provider>
  );
}
