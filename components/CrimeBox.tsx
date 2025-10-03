import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import BodyText from "./BodyText";
import ThemeIcon from "./ThemeIcon";
import TitleText from "./TitleText";

type Props = {
  crimeId: string;
};

const CRIME_DB: Record<string, { name: string; date: string, solved: boolean }> = {
  "1": { name: "Robbery at 5th Street", date: "2025-09-10", solved: true },
  "2": { name: "Burglary in Central Park", date: "2025-09-15", solved: false },
  "3": { name: "Vandalism on Main Ave", date: "2025-09-20", solved: false },
};

export default function CrimeBox({ crimeId }: Props) {
  const { colors } = useTheme();
  const crime = CRIME_DB[crimeId];

  if (!crime) {
    return null;
  }

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/crime",
          params: { crimeId },
        })
      }
    >
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        {/* left side: text */}
        <View>
          <TitleText text={crime.name} size={18} />
          <BodyText text={crime.date} size={14} />
        </View>

        {/* right side: solved icon if true */}
        {crime.solved && <ThemeIcon lib="fa6" name="handcuffs" size={20} />}
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
    alignItems: "center", // left-align text
    flexDirection: "row",          // 👈 arrange text + icon side by side
    justifyContent: "space-between", // 👈 push them apart
  },
});
