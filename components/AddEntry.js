import React from "react";
import { View } from "react-native";
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

  return <View>{getMetricMetaInfo("swim").getIcon()}</View>;
}
