import * as RootNavigation from "../navigation/RootNavigation";

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getDailyReminderValue,
  getMetricMetaInfo,
  timeToString,
} from "../utils/helpers";
import { purple, white } from "../utils/colors";
import { removeEntry, submitEntry } from "../utils/api";

import ActivitySlider from "./ActivitySlider";
import ActivityStepper from "./ActivityStepper";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import TextButton from "./TextButton";
import { addEntry } from "../actions/index";
import { connect } from "react-redux";

function SubmitButton({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

function AddEntry({ navigation, alreadyLogged, dispatch }) {
  const initialActivityState = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  const [activityState, setActivityState] = React.useState(
    initialActivityState
  );

  const increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    setActivityState((activityState) => {
      const count = activityState[metric] + step;

      return {
        ...activityState,
        [metric]: count > max ? max : count,
      };
    });
  };

  const decrement = (metric) => {
    const { step, max } = getMetricMetaInfo(metric);

    setActivityState((activityState) => {
      const count = activityState[metric] - step;

      return {
        ...activityState,
        [metric]: count < 0 ? 0 : count,
      };
    });
  };

  const slide = (metric, value) => {
    setActivityState(() => ({
      ...activityState,
      [metric]: value,
    }));
  };

  const submit = () => {
    const key = timeToString();
    const entry = activityState;

    console.info("key: ", key);
    console.info("entry: ", entry);

    // Update Redux
    dispatch(
      addEntry({
        [key]: entry,
      })
    );

    setActivityState(() => initialActivityState);

    // Navigate to home
    toHistoryNavigation();

    // Save to "DB"
    submitEntry({ key, entry });

    // Clear the local notification
  };

  const metaInfo = getMetricMetaInfo();

  const reset = () => {
    const key = timeToString();

    // Update Redux
    dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    );

    // Route to Home
    toHistoryNavigation();

    // Update "DB"
    removeEntry(key);
  };

  const toHistoryNavigation = (routeName = "History") => {
    RootNavigation.navigate(routeName);
  };

  if (alreadyLogged) {
    return (
      <View style={styles.center}>
        <Ionicons
          name={
            Platform.OS === "ios" ? "ios-happy-outline" : "md-happy-outline"
          }
          size={100}
          color={"black"}
        />
        <Text>You already logged your information for today!</Text>
        <TextButton style={{ padding: 10 }} onPress={reset}>
          RESET
        </TextButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map((key) => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = activityState[key];

        return (
          <View key={key} style={styles.row}>
            {getIcon()}
            {type === "slider" ? (
              <ActivitySlider
                value={value}
                onChange={(value) => slide(key, value)}
                {...rest}
              />
            ) : (
              <ActivityStepper
                value={value}
                onIncrement={(value) => increment(key)}
                onDecrement={(value) => decrement(key)}
                {...rest}
              />
            )}
          </View>
        );
      })}

      <SubmitButton onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
});

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
}

export default connect(mapStateToProps)(AddEntry);
