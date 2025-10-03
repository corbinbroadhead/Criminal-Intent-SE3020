import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ThemeButtonProps = {
  text: string;
  onPress?: () => void;
};

const ThemeButton = ({ text, onPress }: ThemeButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#efda22ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    marginBottom: "3%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#18191dff",
    textAlign: "center",
  },
});

export default ThemeButton;
