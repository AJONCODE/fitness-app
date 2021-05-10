import * as React from "react";

import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { Provider } from "react-redux";
import { View } from "react-native";
import { createStore } from "redux";
import reducer from "./reducers/index";

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        {/* <AddEntry /> */}
        {/* <View style={{ height: 60 }} /> */}
        <History />
      </View>
    </Provider>
  );
}
