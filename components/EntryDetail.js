import { Text, View } from "react-native";

import React from "react";

export default function EntryDetail({ navigation, route }) {
  const { entryId } = route.params;
  React.useEffect(() => {
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    navigation.setOptions({
      title: `${month}/${day}/${year}`,
    });
  }, []);

  return (
    <View>
      <Text>Entry Detail - {entryId}</Text>
    </View>
  );
}
