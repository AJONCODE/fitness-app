import * as React from "react";

import { Text, View } from "react-native";

import ActivitySlider from "./components/ActivitySlider";
import ActivityStepper from "./components/ActivityStepper";
import AddEntry from "./components/AddEntry";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/index";

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddEntry />
      </View>
    </Provider>
  );
}
