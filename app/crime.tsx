import Checkbox from "@/components/Checkbox";
import ImagePickerButton from "@/components/ImagePickerButton";
import SingleLineEntry from "@/components/SingleLineEntry";
import ThemeDatePicker from "@/components/ThemeDatePicker";
import ThemeIcon from "@/components/ThemeIcon";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { DateType, useDefaultStyles } from "react-native-ui-datepicker";
import MultiLineEntry from "../components/MultiLineEntry";
import StandardButton from "../components/StandardButton";
import TitleText from "../components/TitleText";

import crimeStorage, { Crime } from "@/utils/crimeStorage";

const CrimeScreen = () => {
  const { crimeId } = useLocalSearchParams<{ crimeId?: string }>();
  const { colors } = useTheme();
  const defaultStyles = useDefaultStyles();
  const router = useRouter();

  // State for fields
  const [crime, setCrime] = useState<Partial<Crime>>({
    name: "",
    desc: "",
    image: "",
    date: "",
    solved: false,
  });

  const [selected, setSelected] = useState<DateType>();
  const [showPicker, setShowPicker] = useState(false);

  // Load existing crime if editing
  useEffect(() => {
    if (crimeId) {
      (async () => {
        const existing = await crimeStorage.getCrime(crimeId);
        if (existing) {
          setCrime(existing);
          if (existing.date) setSelected(new Date(existing.date));
        }
      })();
    }
  }, [crimeId]);

  // Format date
  const formattedDate =
    selected instanceof Date
      ? selected.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : crime.date
      ? new Date(crime.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  // Save handler
  const handleSave = async () => {
    try {
      const payload = {
        ...crime,
        date: selected instanceof Date ? selected.toISOString() : crime.date,
      } as Omit<Crime, "id">;

      if (crimeId) {
        await crimeStorage.updateCrime(crimeId, payload);
        Alert.alert("Success", "Crime updated successfully!");
      } else {
        await crimeStorage.addCrime(payload);
        Alert.alert("Success", "Crime created successfully!");
      }

      router.back();
    } catch (e) {
      Alert.alert("Error", "Something went wrong while saving.");
      console.error(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: colors.secondary }]}>
        {/* Top row: image + title + entry */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
        >
          <ImagePickerButton
            text={<ThemeIcon name="camera" size={24} />}
            placeholder={
              crime.image ||
              "https://media.istockphoto.com/id/1182268423/vector/spy-icon.jpg"
            }
            onPick={(uri: string) =>
              setCrime((c) => ({
                ...c,
                image: uri, // save selected image URI
              }))
            }
          />
          <View style={{ flex: 1 }}>
            <TitleText
              text={crimeId ? crime?.name || "" : "New Crime"}
              size={18}
            />
            <SingleLineEntry
              placeholder="Enter crime title..."
              value={crime.name}
              onChangeText={(val) => setCrime((c) => ({ ...c, name: val }))}
            />
          </View>
        </View>

        {/* Details */}
        <TitleText text="Details" size={18} margin={6} />
        <MultiLineEntry
          placeholder="Enter details..."
          height={150}
          value={crime.desc}
          onChangeText={(val) => setCrime((c) => ({ ...c, desc: val }))}
        />

        {/* Date handling */}
        <View style={{ marginTop: 16 }}>
          {showPicker && (
            <ThemeDatePicker
              date={selected}
              onChange={(date) => {
                setSelected(date);
                setShowPicker(false);
              }}
            />
          )}

          <StandardButton
            text={formattedDate ? `Date: ${formattedDate}` : "Pick a Date"}
            onClick={() => setShowPicker(true)}
          />

          <Checkbox
            text="Solved"
            checked={crime.solved}
            onClick={() => setCrime((c) => ({ ...c, solved: !c.solved }))}
          />

          <StandardButton text="Save" onClick={handleSave} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CrimeScreen;
