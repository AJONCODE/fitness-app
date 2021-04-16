import * as React from "react";

import { Text, View } from "react-native";

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
