import { useTheme } from "@/contexts/ThemeContext";
import { Crime } from "@/utils/crimeStorage";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import BodyText from "./BodyText";
import ThemeIcon from "./ThemeIcon";
import TitleText from "./TitleText";

type Props = {
  crime: Crime;
};

export default function CrimeBox({ crime }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/crime",
          params: { crimeId: crime.id },
        })
      }
    >
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <View>
          <TitleText text={crime.name} size={18} />
          <BodyText
            text={
              crime.date
                ? new Date(crime.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "No date set"
            }
            size={14}
          />
        </View>

        {crime.solved && <ThemeIcon lib="fa6" name="handcuffs" size={20} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
