import Checkbox from "@/components/Checkbox";
import ImagePickerButton from "@/components/ImagePickerButton";
import SingleLineEntry from "@/components/SingleLineEntry";
import ThemeDatePicker from "@/components/ThemeDatePicker";
import { useTheme } from "@/contexts/ThemeContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { DateType, useDefaultStyles } from "react-native-ui-datepicker";
import MultiLineEntry from "../components/MultiLineEntry";
import StandardButton from "../components/StandardButton";
import TitleText from "../components/TitleText";

const CRIME_DB: Record<string, { name: string; date: string; desc: string }> = {
  "1": { name: "Robbery at 5th Street", date: "2025-09-10", desc: "They robbed us!" },
  "2": { name: "Burglary in Central Park", date: "2025-09-15", desc: "They burgled us!" },
  "3": { name: "Vandalism on Main Ave", date: "2025-09-20", desc: "They vandalized us!" },
};

const CrimeScreen = ({ navigation }: any) => {
  const { crimeId } = useLocalSearchParams<{ crimeId: string }>();
  const crime = CRIME_DB[crimeId];
  const { colors } = useTheme();
  const defaultStyles = useDefaultStyles();

  const [selected, setSelected] = useState<DateType>();
  const [showPicker, setShowPicker] = useState(false);

  // format the selected date OR fallback to crime date
  const initialCrimeDate =
    crime?.date
      ? (() => {
          const [year, month, day] = crime.date.split("-").map(Number);
          const dateObj = new Date(year, month - 1, day);
          return dateObj.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        })()
      : "";


  const formattedDate =
    selected instanceof Date
      ? selected.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : initialCrimeDate;


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: colors.secondary }]}>
        {/* Top row: image + title + entry */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <ImagePickerButton
            text={<FontAwesome name="camera" size={24} color="white"/>}
            placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Unknown_toxicity_icon.svg/2048px-Unknown_toxicity_icon.svg.png"
            onPick={() => console.log("Picked image")}
          />
          <View style={{ flex: 1 }}>
            <TitleText text={crime?.name || ""} size={18} />
            <SingleLineEntry placeholder={crime?.name || ""} />
          </View>
        </View>

        {/* Details */}
        <TitleText text="Details" size={18} margin={6} />
        <MultiLineEntry placeholder={crime.desc} height={150} />

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

          {/* Button updates its text dynamically */}
          <StandardButton
            text={formattedDate ? `Date: ${formattedDate}` : "Pick a Date"}
            onClick={() => setShowPicker(true)}
          />


          <Checkbox text="Solved" onClick={() => console.log("Solved checked")} />
          <StandardButton text="Save" onClick={() => console.log("save the crime press")} />
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
