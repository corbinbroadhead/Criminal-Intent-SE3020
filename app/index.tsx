import { useTheme } from "@/contexts/ThemeContext";
import crimeStorage, { Crime } from "@/utils/crimeStorage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CrimeBox from "../components/CrimeBox";

const IndexScreen = () => {
  // Access theme colors for consistent UI styling.
  const { colors } = useTheme();

  // Local state to hold all stored crimes.
  const [crimes, setCrimes] = useState<Crime[]>([]);

  /**
   * Refresh the list of crimes whenever this screen
   * comes into focus (e.g., when the user navigates back from the Crime screen).
   * 
   * useFocusEffect runs every time the screen becomes active.
   * The useCallback ensures that the function identity is stable
   * between re-renders, preventing unnecessary reloads.
   */
  useFocusEffect(
    useCallback(() => {
      (async () => {
        // Retrieve all crimes stored in AsyncStorage.
        const all = await crimeStorage.getCrimes();
        // Update local state to re-render the list.
        setCrimes(all);
      })();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      {/* FlatList efficiently renders a scrolling list of crimes */}
      <FlatList
        contentContainerStyle={styles.listContent}
        data={crimes}
        keyExtractor={(item) => item.id} // Each crime must have a unique UUID.
        renderItem={({ item }) => <CrimeBox crime={item} />} // Render each crime box.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20, // Adds vertical padding around the list.
  },
  listContent: {
    paddingHorizontal: 16, // Adds horizontal padding inside the FlatList.
  },
});

export default IndexScreen;
