import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import React from "react";

export default function ActivityStepper({
  max,
  unit,
  step,
  value,
  onIncrement,
  onDecrement,
}) {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name="minus" size={30} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name="plus" size={30} color={"black"} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}
