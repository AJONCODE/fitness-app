import { StyleSheet, Text, View } from "react-native";
import { getDailyReminderValue, timeToString } from "../utils/helpers";

import MetricCard from "./MetricCard";
import React from "react";
import TextButton from "./TextButton";
import { addEntry } from "../actions";
import { connect } from "react-redux";
import { removeEntry } from "../utils/api";
import { white } from "../utils/colors";

// entryId is the history date
function EntryDetail({
  navigation,
  entryId,
  metrics,
  removeEntryDispatch,
  goBackDispatch,
}) {
  React.useEffect(() => {
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    navigation.setOptions({
      title: `${month}/${day}/${year}`,
    });
  }, [entryId]);

  const reset = () => {
    removeEntryDispatch();
    goBackDispatch();
    removeEntry(entryId);
  };

  return (
    <View style={styles.container}>
      <Text>Entry Detail - {entryId}</Text>
      <MetricCard metrics={metrics} />
      <TextButton onPress={reset} style={{ margin: 20 }}>
        RESET
      </TextButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

function mapStateToProps(state, { route }) {
  const { entryId } = route.params;

  return {
    entryId,
    metrics: state[entryId],
  };
}

function mapDispatchToProps(dispatch, { navigation, route }) {
  const { entryId } = route.params;

  return {
    removeEntryDispatch: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        })
      ),
    goBackDispatch: () => navigation.goBack(),
  };
}

// Here react skips rendering the component and doesn’t perform a virtual DOM difference check.
// if nextProps.metrics == null || !nextProps.metrics.today return true, then react reuses the
// memoized result skipping the next rendering.
function shouldEntryDetailUpdate(nextProps) {
  return nextProps.metrics == null || !nextProps.metrics.today;
}

const MemoizedEntryDetail = React.memo(EntryDetail, shouldEntryDetailUpdate);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoizedEntryDetail);
