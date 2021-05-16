import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import React from "react";

export default function Compass() {
  const [compassState, setCompassState] = React.useState({
    coordinate: null,
    status: null,
    direction: "",
  });

  if (!compassState.status) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  if (compassState.status === "denied") {
    return (
      <View>
        <Text>Denied</Text>
      </View>
    );
  }

  if (compassState.status === "undetermined") {
    return (
      <View>
        <Text>Undetermined</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Compass</Text>
      <Text>{JSON.stringify(compassState, null, 2)}</Text>
    </View>
  );
}
