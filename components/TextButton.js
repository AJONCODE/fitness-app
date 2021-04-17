import { Text, TouchableOpacity } from "react-native";

import React from "react";

export default function TextButton({ children, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
