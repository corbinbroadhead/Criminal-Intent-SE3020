import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

export default function ThemeDatePicker({ date, onChange }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: "#d7dce1ff", // your themed background
        borderRadius: 8,
        padding: 10,
      }}
    >
      <DateTimePicker
        mode="single"
        date={date}
        onChange={({ date }) => onChange(date)}
        styles={{
          headerText: { color: colors.text, fontWeight: "bold" },
          weekDaysText: { color: colors.text },
          dayLabel: { color: colors.text },
          dayText: { color: colors.text },
          todayText: { color: colors.primary },
          selectedDay: { backgroundColor: colors.primary },
          selectedDayText: { color: colors.secondary },
        }}
      />
    </View>
  );
}
