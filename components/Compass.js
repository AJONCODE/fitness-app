import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

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
import { calculateDirection } from "../utils/helpers";

export default function Compass() {
  const [compassState, setCompassState] = React.useState({
    coordinate: null,
    status: null,
    direction: "",
  });

  const askPermission = () => {};

  const setLocation = () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1,
      },
      ({ coordinate }) => {
        console.info("Location.watchPositionAsync -> coordinate: ", coordinate);
        const newDirection = calculateDirection(coordinate.heading);

        console.info("newDirection: ", newDirection);

        setCompassState({
          coordinate,
          status: "granted",
          direction: newDirection,
        });
      }
    );
  };

  React.useEffect(() => {
    Permissions.askAsync(Permissions.Location)
      .then((status) => {
        console.info("status: ", status);
        if (status === "granted") {
          return setLocation();
        }

        setCompassState({
          ...compassState,
          status,
        });
      })
      .catch((error) => {
        console.warn("Error getting location permission: ", error);
        setCompassState({
          ...compassState,
          status: "undetermined",
        });
      });
  }, []);

  if (!compassState.status) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  if (compassState.status === "denied") {
    return (
      <View style={styles.center}>
        <Foundation name="alert" size={50} color={paleRed} />
        <Text>
          Location is denied. Please fix this by visiting settings and enabling
          location services for this app.
        </Text>
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
    <View style={styles.container}>
      <View style={styles.directionContainer}>
        <Text style={styles.header}>You're heading</Text>
        <Text style={styles.direction}>North</Text>
      </View>
      <View style={styles.metricContainer}>
        <View style={styles.metric}>
          <Text style={[styles.statHeader, { color: white }]}>Altitude</Text>
          <Text style={[styles.statSubHeader, { color: white }]}>
            {200} Feet
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.statHeader, { color: white }]}>Speed </Text>
          <Text style={[styles.statSubHeader, { color: white }]}>
            {300} MPH
          </Text>
        </View>
      </View>
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
  directionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  direction: {
    color: lightPurp,
    fontSize: 70,
    fontWeight: "600",
    textAlign: "center",
  },
  metricContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: lightPurp,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  statHeader: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
  },
  statSubHeader: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
  },
});
