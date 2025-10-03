import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "react-native";

type Props = {
  text: string;
  size?: number;
  margin?: number;
};

export default function BodyText({ text, size = 16, margin = 2 }: Props) {
  const { colors } = useTheme();

  return (
    <Text
      style={{
        fontSize: size,
        marginVertical: margin,
        color: colors.text,
        fontWeight: "normal",
      }}
    >
      {text}
    </Text>
  );
}
