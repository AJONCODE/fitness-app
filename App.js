import * as React from "react";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { lightPurp, white } from "./utils/colors";

import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStore } from "redux";
import reducer from "./reducers/index";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <View style={{ height: 20 }} />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "History") {
                  iconName = focused
                    ? "ios-bookmarks"
                    : "ios-bookmarks-outline";
                } else if (route.name === "AddEntry") {
                  iconName = focused ? "plus-square" : "plus-square-o";
                  return (
                    <FontAwesome name={iconName} size={size} color={color} />
                  );
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              navigationOptions: {
                header: null,
              },
            })}
            tabBarOptions={{
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
          </Tab.Navigator>
        </NavigationContainer>
        {/* <Tabs /> */}
      </View>
    </Provider>
  );
}
