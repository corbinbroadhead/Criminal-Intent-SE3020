import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import BodyText from "./BodyText";
import TitleText from "./TitleText";

type Props = {
  crimeId: string;
};

const CRIME_DB: Record<string, { name: string; date: string }> = {
  "1": { name: "Robbery at 5th Street", date: "2025-09-10" },
  "2": { name: "Burglary in Central Park", date: "2025-09-15" },
  "3": { name: "Vandalism on Main Ave", date: "2025-09-20" },
};

export default function CrimeBox({ crimeId }: Props) {
  const { colors } = useTheme();
  const crime = CRIME_DB[crimeId];

  if (!crime) {
    return null;
  }

  return (
    <Pressable onPress={() => router.push({
        pathname: "/crime",
        params: { crimeId: crimeId }
    })}>
        <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <TitleText text={crime.name} size={18} />
        <BodyText text={crime.date} size={14} />
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",       // ensures it fills the parent container
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "flex-start", // left-align text
  },
});
