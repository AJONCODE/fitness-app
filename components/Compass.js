import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import {
  ActivityIndicator,
  Animated,
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
  const bounceAnimation = React.useRef(new Animated.Value(1)).current;

  const [compassState, setCompassState] = React.useState({
    coordinate: null,
    status: null,
    direction: "",
  });

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === "granted") {
        return setLocation();
      }

      setCompassState({
        ...compassState,
        status,
      });
    } catch (error) {
      console.warn("Error asking location permission: ", error);
    }
  };

  const setLocation = () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1,
        distanceInterval: 1,
      },
      (location) => {
        const newDirection = calculateDirection(location.coords.heading);

        if (newDirection !== compassState.direction) {
          Animated.sequence([
            Animated.timing(bounceAnimation, {
              duration: 200,
              toValue: 1.04,
              useNativeDriver: true,
            }),
            Animated.spring(bounceAnimation, {
              toValue: 1,
              friction: 4,
              useNativeDriver: true,
            }),
          ]).start();
        }

        setCompassState({
          coordinate: location.coords,
          status: "granted",
          direction: newDirection,
        });
      }
    );
  };

  const getPermissionAsync = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === "granted") {
        return setLocation();
      }

      setCompassState({
        ...compassState,
        status,
      });
    } catch (error) {
      console.warn("Error getting location permission: ", error);
      setCompassState({
        ...compassState,
        status: "undetermined",
      });
    }
  };

  React.useEffect(() => {
    (async () => {
      await getPermissionAsync();
    })();
  }, []);

  if (!compassState.status) {
    return (
      <View style={styles.center}>
        <ActivityIndicator style={{ marginTop: 30 }} />
      </View>
    );
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
        <Animated.Text
          style={[
            styles.direction,
            { transform: [{ scale: bounceAnimation }] },
          ]}
        >
          {compassState.direction}
        </Animated.Text>
      </View>
      <View style={styles.metricContainer}>
        <View style={styles.metric}>
          <Text style={[styles.statHeader, { color: white }]}>Altitude</Text>
          <Text style={[styles.statSubHeader, { color: white }]}>
            {Math.round(compassState.coordinate.altitude * 3.2808)} Feet
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.statHeader, { color: white }]}>Speed </Text>
          <Text style={[styles.statSubHeader, { color: white }]}>
            {(compassState.coordinate.speed * 2.2369).toFixed(1)} MPH
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
