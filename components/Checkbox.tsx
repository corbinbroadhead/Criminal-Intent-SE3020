import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  text: string;
  onClick: (checked: boolean) => void;
};

export default function Checkbox({ text, onClick }: Props) {
  const { colors } = useTheme();
  const [checked, setChecked] = useState(false);

  const toggle = () => {
    const newVal = !checked;
    setChecked(newVal);
    onClick(newVal);
  };

  return (
    <TouchableOpacity
      onPress={toggle}
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
