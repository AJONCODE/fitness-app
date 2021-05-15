import { StyleSheet, Text, View } from "react-native";

import MetricCard from "./MetricCard";
import React from "react";
import { connect } from "react-redux";
import { white } from "../utils/colors";

// entryId is the history date
function EntryDetail({ navigation, entryId, metrics }) {
  React.useEffect(() => {
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    navigation.setOptions({
      title: `${month}/${day}/${year}`,
    });
  }, [entryId]);

  return (
    <View style={styles.container}>
      <Text>Entry Detail - {entryId}</Text>
      <MetricCard metrics={metrics} />
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

export default connect(mapStateToProps)(EntryDetail);
