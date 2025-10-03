import { useTheme } from "@/contexts/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  text: string;
  onClick: () => void;
};

export default function StandardButton({ text, onClick }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 6,
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}>{text}</Text>
    </TouchableOpacity>
  );
}
