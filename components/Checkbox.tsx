import { useTheme } from "@/contexts/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  text: string;
  checked: boolean;
  onClick: (checked: boolean) => void;
};

export default function Checkbox({ text, checked, onClick }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onClick(!checked)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6,
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderWidth: 2,
          borderColor: colors.text,
          backgroundColor: checked ? colors.text : "transparent",
          marginRight: 8,
        }}
      />
      <Text style={{ color: colors.text }}>{text}</Text>
    </TouchableOpacity>
  );
}
