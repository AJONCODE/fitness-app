import { Text, View } from "react-native";
import { addEntry, receiveEntries } from "../actions/index";
import { getDailyReminderValue, timeToString } from "../utils/helpers";

import CalenderView from "./CalenderView";
import React from "react";
import { connect } from "react-redux";
import { fetchCalenderResults } from "../utils/api";
import { formatDate } from "../utils/_calendar";

function History({ dispatch, entries }) {
  const [selectedDate, setSelectedDate] = React.useState(
    formatDate(new Date())
  );

  React.useEffect(() => {
    fetchCalenderResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ payload }) => {
        // console.info("payload: ", payload);
        if (!payload[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue(),
            })
          );
        }
      });
  }, []);

  const renderItem = () => {
    // const renderItem = (formattedDate, key) => {
    // console.log("renderItem: formattedDate: ", formattedDate);
    // console.log("renderItem: key: ", key);

    // const { today } = getDailyReminderValue();
    const metrics = entries;

    const today = entries[`${selectedDate}`];

    // console.log("renderItem: today: ", today);
    // console.log("renderItem: metrics: ", metrics);
    return (
      <View>
        {today ? (
          <Text>{JSON.stringify(today)}</Text>
        ) : (
          <Text>{JSON.stringify(metrics)}</Text>
        )}
      </View>
    );
  };

  // console.info("entries: ", entries);
  // console.info("selectedDate: ", selectedDate);
  console.info("entries value on selectedDate", entries[`${selectedDate}`]);

  return (
    <View>
      <Text>History</Text>
      {/* <Text>{JSON.stringify(entries, null, 2)}</Text> */}

      <CalenderView setSelectedDate={setSelectedDate} />

      {selectedDate && renderItem()}
    </View>
  );
}

function mapStateToProps(entries) {
  return {
    entries,
  };
}

export default connect(mapStateToProps)(History);
