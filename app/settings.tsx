import StandardButton from "@/components/StandardButton";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

/**
 * THEMES is a static list of available theme options.
 * Each theme has a unique key (used internally) and a label (for display).
 * The `as const` ensures these values are readonly and strongly typed.
 */
const THEMES = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "cowboy", label: "Cowboy" },
  { key: "raven", label: "Raven" },
  { key: "rootbeer", label: "Root Beer" },
  { key: "creamsicle", label: "Creamsicle" },
  { key: "carolina", label: "Carolina" },
  { key: "jazz", label: "Jazz" },
] as const;

/**
 * The Settings screen allows users to switch between different visual themes.
 * It retrieves the current theme context and updates it when the user selects a new one.
 */
export default function Settings() {
  // Access current theme colors and theme-switching function from ThemeContext.
  const { colors, setContextTheme } = useTheme();

  return (
    // ScrollView ensures accessibility on smaller screens (in case of many theme buttons).
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.secondary }]}>
      {/* Screen title */}
      <TitleText text="Pick a Theme" size={22} margin={12} />

      {/* Group of theme selection buttons */}
      <View style={styles.buttonGroup}>
        {THEMES.map((t) => (
          <View key={t.key} style={styles.buttonWrapper}>
            {/* Each button sets a new theme when pressed */}
            <StandardButton text={t.label} onClick={() => setContextTheme(t.key)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Container styles define layout and spacing for the entire screen.
  container: {
    flexGrow: 1,          // Allows ScrollView to expand vertically.
    padding: 16,          // Adds padding around all edges.
    alignItems: "center", // Centers title and button group horizontally.
  },
  // Groups all theme buttons with consistent spacing and alignment.
  buttonGroup: {
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  // Wraps each button in a margin for visual separation.
  buttonWrapper: {
    width: "90%",
    marginVertical: 6,
  },
});
