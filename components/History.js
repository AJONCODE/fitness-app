import { Text, View } from "react-native";
import { addEntry, receiveEntries } from "../actions/index";
import { getDailyReminderValue, timeToString } from "../utils/helpers";

import React from "react";
import { connect } from "react-redux";
import { fetchCalenderResults } from "../utils/api";

function History({ dispatch, entries }) {
  React.useEffect(() => {
    fetchCalenderResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue,
            })
          );
        }
      });
  }, []);

  return (
    <View>
      <Text>History</Text>
      <Text>{JSON.stringify(entries, null, 2)}</Text>
    </View>
  );
}

function mapStateToProps(entries) {
  return {
    entries,
  };
}

export default connect(mapStateToProps)(History);
