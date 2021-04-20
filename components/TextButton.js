import { StyleSheet, Text, TouchableOpacity } from "react-native";

import React from "react";
import { purple } from "../utils/colors";

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: "center",
    color: purple,
  },
});
