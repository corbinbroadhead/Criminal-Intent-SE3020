import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "react-native";

type Props = {
  text: string;
  size?: number;
  margin?: number;
};

export default function TitleText({ text, size = 20, margin = 2 }: Props) {
  const { colors } = useTheme();

  return (
    <Text
      style={{
        fontSize: size,
        marginVertical: margin,
        color: colors.text,
        fontWeight: "bold",
      }}
    >
      {text}
    </Text>
  );
}
