import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addEntry, receiveEntries } from "../actions/index";
import {
  formatted,
  getDailyReminderValue,
  timeToString,
} from "../utils/helpers";

import AppLoading from "expo-app-loading";
import CalenderView from "./CalenderView";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";
import React from "react";
import { connect } from "react-redux";
import { fetchCalenderResults } from "../utils/api";
import { formatDate } from "../utils/_calendar";
import { white } from "../utils/colors";

function History({ dispatch, entries }) {
  const [ready, setReady] = React.useState(false);
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
      })
      .then(() => setReady(true));
  }, []);

  const renderItem = (formattedDate) => {
    // const metrics = entries;
    const metrics = entries[`${formattedDate}`];
    const today = metrics.today;

    return (
      <View style={styles.item}>
        {!!today ? (
          <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>{today}</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => console.log("Pressed!")}>
            <MetricCard date={formattedDate} metrics={metrics} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderEmptyItem = (formattedDate) => {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDataText}>No Data logged on this day.</Text>
      </View>
    );
  };

  // console.info("entries: ", entries);
  // console.info("selectedDate: ", selectedDate);
  console.info("entries value on selectedDate", entries[`${selectedDate}`]);

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <View>
      {/* <Text>{JSON.stringify(entries, null, 2)}</Text> */}

      <CalenderView setSelectedDate={setSelectedDate} />

      {entries[`${selectedDate}`]
        ? renderItem(selectedDate)
        : renderEmptyItem(selectedDate)}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

function mapStateToProps(entries) {
  return {
    entries,
  };
}

export default connect(mapStateToProps)(History);
