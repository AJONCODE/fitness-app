import CalendarDays from "react-native-calendar-slider-carousel";
// import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export default function CalenderView({ setSelectedDate }) {
  return (
    <View>
      {/* <Text>{JSON.stringify(entries, null, 2)}</Text> */}

      <CalendarDays
        // First day. Default = new Date()
        firstDate={new Date().setDate(new Date().getDate() - 30)}
        // Last day. You can set number of days instead
        lastDate={new Date()}
        // Sets number of days displaued. Default = 30
        // numberOfDays={31}
        // Initial selected day. Default = firstDate
        selectedDate={new Date()}
        // Optional text that replaces week day in disabled days
        disabledText={"closed"}
        // scrollView width
        width={370}
        // Instead of width you can set number of days visible.
        daysInView={3}
        // Only available if width % 120 = 0. Scroll by full width
        paginate={true}
        // Function to get selected date in 'YYYY-MM-DD' format
        onDateSelect={(date) => setSelectedDate(date)}
        // Replaces scroll with left and right arrows.
        // Suitable for web where horizontal scroll is not always available
        // arrows={true}
        // Arrow icon components. Required if arrows={true}
        // leftArrow={<FontAwesome name="bed" size={20} color="#e3422e" />}
        // rightArrow={<FontAwesome name="bed" size={20} color="#e3422e" />}
      />
    </View>
  );
}
