import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { AsyncStorage, StyleSheet, View } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  lightPurp,
  paleBlue,
  paleOrange,
  paleRed,
  pink,
  white,
} from "./colors";

import React from "react";

const NOTIFICATION_KEY = "FitnessApp:notifications";

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});

export function getMetricMetaInfo(metric) {
  const info = {
    run: {
      displayName: "Run",
      max: 50,
      unit: "miles",
      step: 1,
      type: "steppers",
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: paleRed }]}>
            <MaterialIcons name="directions-run" color={white} size={35} />
          </View>
        );
      },
    },
    bike: {
      displayName: "Bike",
      max: 100,
      unit: "miles",
      step: 1,
      type: "steppers",
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: paleOrange }]}>
            <MaterialCommunityIcons name="bike" color={white} size={32} />
          </View>
        );
      },
    },
    swim: {
      displayName: "Swim",
      max: 9900,
      unit: "meters",
      step: 100,
      type: "steppers",
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: paleBlue }]}>
            <MaterialCommunityIcons name="swim" color={white} size={35} />
          </View>
        );
      },
    },
    sleep: {
      displayName: "Sleep",
      max: 24,
      unit: "hours",
      step: 1,
      type: "slider",
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: lightPurp }]}>
            <FontAwesome name="bed" color={white} size={30} />
          </View>
        );
      },
    },
    eat: {
      displayName: "Eat",
      max: 10,
      unit: "rating",
      step: 1,
      type: "slider",
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: pink }]}>
            <MaterialCommunityIcons name="food" color={white} size={35} />
          </View>
        );
      },
    },
  };

  // If metric argument is not passed to the getMetricMetaInfo function
  return typeof metric === "undefined" ? info : info[metric];
}

export function isBetween(num, x, y) {
  if (num >= x && num <= y) {
    return true;
  }
  return false;
}

export function calculateDirection(heading) {
  let direction = "";
  if (isBetween(heading, 0, 22.5)) {
    direction = "North";
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = "North East";
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = "East";
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = "South East";
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = "South";
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = "South West";
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = "West";
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = "North West";
  } else if (isBetween(heading, 337.5, 360)) {
    direction = "North";
  } else {
    direction = "Calculating";
  }
  return direction;
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}

export function getDailyReminderValue() {
  return {
    today: "??? Don't forget to log your data today!",
  };
}

export function clearLocatNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function createNotification() {
  return {
    title: "??? Log your stats!",
    body: "Don't forgot to log your stats for today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.Notifications).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelScheduledNotificationAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(9);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
