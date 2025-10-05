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
  // Retrieve parameters passed from navigation.
  // If the user is editing, crimeId or full crimeData may be passed.
  const { crimeId, crimeData } = useLocalSearchParams<{ crimeId?: string; crimeData?: string }>();

  // Access theme colors.
  const { colors } = useTheme();

  // Provides default styling for the date picker.
  const defaultStyles = useDefaultStyles();

  // Router used to navigate back after saving.
  const router = useRouter();

  // Local state for a single crime object.
  const [crime, setCrime] = useState<Partial<Crime>>({
    name: "",
    desc: "",
    image: "",
    date: "",
    solved: false,
  });

  // State for the selected date.
  const [selected, setSelected] = useState<DateType>();

  // Controls whether the date picker is visible.
  const [showPicker, setShowPicker] = useState(false);

  // Load an existing crime if we are editing one.
  useEffect(() => {
    (async () => {
      if (crimeData) {
        // Parse full crime data passed directly as JSON.
        setCrime(JSON.parse(crimeData));
      } else if (crimeId) {
        // If only an ID is provided, fetch from storage.
        const existing = await crimeStorage.getCrime(crimeId);
        if (existing) {
          setCrime(existing);
          if (existing.date) setSelected(new Date(existing.date));
        }
      }
    })();
  }, [crimeId, crimeData]);

  // Format the displayed date for the button text.
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

  // Handle saving or updating the crime entry.
  const handleSave = async () => {
    try {
      // Create the final data payload to store.
      const payload = {
        ...crime,
        date: selected instanceof Date ? selected.toISOString() : crime.date,
      } as Omit<Crime, "id">;

      console.log("Saving payload:", payload);

      // If editing, update the existing record.
      if (crimeId) {
        await crimeStorage.updateCrime(crimeId, payload);
        Alert.alert("Success", "Crime updated successfully!");
      } else {
        // Otherwise, create a new record.
        await crimeStorage.addCrime(payload);
        Alert.alert("Success", "Crime created successfully!");
      }

      // Navigate back to the previous screen.
      router.back();
    } catch (e) {
      Alert.alert("Error", "Something went wrong while saving.");
      console.error(e);
    }
  };

  return (
    // Dismiss the keyboard when tapping outside input fields.
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: colors.secondary }]}>
        {/* Header section: image and title input */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          {/* Image picker button */}
          <ImagePickerButton
            text={<ThemeIcon name="camera" size={24} />}
            placeholder={crime.image || "https://media.istockphoto.com/id/1182268423/vector/spy-icon.jpg"}
            onPick={(uri: string) => setCrime((c) => ({ ...c, image: uri }))}
          />

          {/* Title input */}
          <View style={{ flex: 1 }}>
            <TitleText text={crimeId ? crime?.name || "" : "New Crime"} size={18} />
            <SingleLineEntry
              placeholder="Enter crime title..."
              value={crime.name}
              onChangeText={(val) => setCrime((c) => ({ ...c, name: val }))}
            />
          </View>
        </View>

        {/* Description input section */}
        <TitleText text="Details" size={18} margin={6} />
        <MultiLineEntry
          placeholder="Enter details..."
          height={150}
          value={crime.desc}
          onChangeText={(val) => setCrime((c) => ({ ...c, desc: val }))}
        />

        {/* Date picker, checkbox, and save button section */}
        <View style={{ marginTop: 16 }}>
          {/* Conditional rendering of the date picker */}
          {showPicker && (
            <ThemeDatePicker
              date={selected}
              onChange={(date) => {
                setSelected(date);
                setShowPicker(false);
              }}
            />
          )}

          {/* Button to display or open date picker */}
          <StandardButton
            text={formattedDate ? `Date: ${formattedDate}` : "Pick a Date"}
            onClick={() => setShowPicker(true)}
          />

          {/* Solved checkbox */}
          <Checkbox
            text="Solved"
            checked={crime.solved || false}
            onClick={(val) => setCrime((c) => ({ ...c, solved: val }))}
          />

          {/* Save button */}
          <StandardButton text="Save" onClick={handleSave} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default CrimeScreen;
