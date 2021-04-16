import { Text, View } from "react-native";

import ActivitySlider from "./ActivitySlider";
import ActivityStepper from "./ActivityStepper";
import DateHeader from "./DateHeader";
import React from "react";
import { getMetricMetaInfo } from "../utils/helpers";

export default function AddEntry() {
  const [activityState, setActivityState] = React.useState({
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  });

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
    const { step } = getMetricMetaInfo(metric);

    setActivityState((activityState) => {
      const count = activityState[metric] - step;

      return {
        ...activityState,
        [metric]: count < max ? 0 : count,
      };
    });
  };

  const slide = (metric, value) => {
    setActivityState(() => ({
      [metric]: value,
    }));
  };

  const metaInfo = getMetricMetaInfo();

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
    </View>
  );
}
