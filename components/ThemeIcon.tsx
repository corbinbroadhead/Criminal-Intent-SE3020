import { useTheme } from "@/contexts/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";

type FontAwesomeName = React.ComponentProps<typeof FontAwesome>["name"];
type FontAwesome6Name = React.ComponentProps<typeof FontAwesome6>["name"];

type Props = {
  name: FontAwesomeName | FontAwesome6Name;
  size?: number;
  color?: string;
  lib?: "fa" | "fa6"; // 👈 choose which library
};

export default function ThemeIcon({ name, size = 24, color, lib = "fa" }: Props) {
  const { colors } = useTheme();
  const resolvedColor = color || colors.text;

  if (lib === "fa6") {
    return <FontAwesome6 name={name as FontAwesome6Name} size={size} color={resolvedColor} />;
  }

  return <FontAwesome name={name as FontAwesomeName} size={size} color={resolvedColor} />;
}
