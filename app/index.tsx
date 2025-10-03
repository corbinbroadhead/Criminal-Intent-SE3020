import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CrimeBox from "../components/CrimeBox";

const IndexScreen = () => {
  const { colors } = useTheme();

  const crimes = [
    { crimeId: "1" },
    { crimeId: "2" },
    { crimeId: "3" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={crimes}
        keyExtractor={(item) => item.crimeId}
        renderItem={({ item }) => <CrimeBox crimeId={item.crimeId} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingVertical: 20,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default IndexScreen;
