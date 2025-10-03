import { useTheme } from "@/contexts/ThemeContext";
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";

type Props = {
  placeholder: string;
  size?: number;
  margin?: number;
  height?: number;
};

export default function MultiLineEntry({
  placeholder,
  size = 12,
  margin = 2,
  height = 120,
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          multiline
          style={{
            fontSize: size,
            marginVertical: margin,
            padding: 10,
            borderWidth: 1,
            borderColor: colors.text,
            color: colors.text,
            backgroundColor: colors.secondary,
            borderRadius: 6,
            textAlignVertical: "top",
            height, // ✅ uses prop, no flex expansion
            width: "90%",
            alignSelf: "center",
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%", // ✅ removed flex: 1 so it won’t push content down
  },
});
