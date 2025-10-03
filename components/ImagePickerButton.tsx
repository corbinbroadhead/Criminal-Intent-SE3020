import { useTheme } from "@/contexts/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { ReactNode, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  text: string | ReactNode; // allow string or icon
  onPick: (uri: string) => void;
  placeholder?: string; // optional placeholder image uri
  size?: number; // optional thumbnail size
};

export default function ImagePickerButton({ text, onPick, placeholder, size = 100 }: Props) {
  const { colors } = useTheme();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onPick(uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={{ alignItems: "center", marginRight: 12 }}>
      <Image
        source={{ uri: image || placeholder }}
        style={{ width: size, height: size, borderRadius: 8, marginBottom: 4 }}
      />
      <View>
        {typeof text === "string" ? (
          <Text style={{ color: colors.text, fontWeight: "bold" }}>{text}</Text>
        ) : (
          text
        )}
      </View>
    </TouchableOpacity>
  );
}
