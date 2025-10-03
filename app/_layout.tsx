// _layout.tsx
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { View } from "react-native";

function ThemedStack() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Index screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Criminal Intent",
          headerBackVisible: false,
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10, marginLeft: 10 }}>
              <Ionicons
                name="add-sharp"
                size={24}
                color={colors.text}
                style={{ marginRight: 14 }}
                onPress={() => router.push("/crime")}
              />
              <Ionicons
                name="settings-sharp"
                size={24}
                color={colors.text}
                onPress={() => router.push("/settings")}
              />
            </View>
          ),
        }}
      />

      {/* Settings screen */}
      <Stack.Screen
        name="settings"
        options={{
          title: "Criminal Intent",
          headerBackVisible: false,
          headerLeft: () => (
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              <Ionicons
                name="arrow-back-sharp"
                size={24}
                color={colors.text}
                style={{ marginHorizontal: 8 }}
                onPress={() => router.back()}
              />
            </View>
          ),
        }}
      />

      {/* Crime screen */}
      <Stack.Screen
        name="crime"
        options={{
          title: "Criminal Intent",
          headerBackVisible: false,
          headerLeft: () => (
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              <Ionicons
                name="arrow-back-sharp"
                size={24}
                color={colors.text}
                style={{ marginHorizontal: 8 }}
                onPress={() => router.back()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              <Ionicons
                name="settings-sharp"
                size={24}
                color={colors.text}
                style={{ marginHorizontal: 8 }}
                onPress={() => router.push("/settings")}
              />
            </View>
          ),
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
