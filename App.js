import * as React from "react";

import { Text, View } from "react-native";

import ActivitySlider from "./components/ActivitySlider";
import ActivityStepper from "./components/ActivityStepper";
import AddEntry from "./components/AddEntry";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AddEntry />
    </View>
  );
}
