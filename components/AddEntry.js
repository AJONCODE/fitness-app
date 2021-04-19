import { Text, TouchableOpacity, View } from "react-native";
import {
  getDailyReminderValue,
  getMetricMetaInfo,
  timeToString,
} from "../utils/helpers";
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
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

function AddEntry({ alreadyLogged, dispatch }) {
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

    // Update "DB"
    removeEntry(key);
  };

  if (alreadyLogged) {
    return (
      <View>
        <Ionicons name="ios-happy-outline" size={100} color={"black"} />
        <Text>You already logged your information for today!</Text>
        {/* RESET button */}
        <TextButton onPress={reset}>RESET</TextButton>
      </View>
    );
  }

  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map((key) => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = activityState[key];

        return (
          <View key={key}>
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

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
}

export default connect(mapStateToProps)(AddEntry);
