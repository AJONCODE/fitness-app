import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { lightPurp, paleRed, white } from "../utils/colors";

import { Foundation } from "@expo/vector-icons";
import React from "react";

export default function Compass() {
  const [compassState, setCompassState] = React.useState({
    coordinate: null,
    // status: null,
    status: "undetermined",
    direction: "",
  });

  const askPermission = () => {};

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
      <View style={styles.center}>
        <Foundation name="alert" size={50} color={paleRed} />
        <Text>Please enable location services for this app.</Text>
        <TouchableOpacity style={styles.button} onPress={askPermission}>
          <Text style={styles.buttonText}>ENABLE</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: lightPurp,
    alignSelf: "center",
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 15,
  },
});
