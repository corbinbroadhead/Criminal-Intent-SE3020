import { useTheme } from "@/contexts/ThemeContext";
import { TextInput } from "react-native";

type Props = {
  placeholder: string;
  size?: number;
  margin?: number;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function SingleLineEntry({
  placeholder,
  size = 16,
  margin = 2,
  value,
  onChangeText,
}: Props) {
  const { colors } = useTheme();

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.text}
      style={{
        fontSize: size,
        marginVertical: margin,
        padding: 8,
        borderWidth: 1,
        borderColor: colors.text,
        color: colors.text,
        backgroundColor: colors.secondary,
        borderRadius: 6,
        width: "90%",
      }}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

