import StandardButton from "@/components/StandardButton";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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

export default function Settings() {
  const { colors, setContextTheme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.secondary }]}>
      <TitleText text="Pick a Theme" size={22} margin={12} />
      <View style={styles.buttonGroup}>
        {THEMES.map((t) => (
          <View key={t.key} style={styles.buttonWrapper}>
            <StandardButton text={t.label} onClick={() => setContextTheme(t.key)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
  },
  buttonGroup: {
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  buttonWrapper: {
    width: "90%",
    marginVertical: 6,
  },
});
