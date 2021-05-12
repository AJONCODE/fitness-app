import { Text, View } from "react-native";

import React from "react";

export default function EntryDetail({ route }) {
  console.info("route: ", route);
  return (
    <View>
      <Text>Entry Detail - {route.params.entryId}</Text>
    </View>
  );
}
