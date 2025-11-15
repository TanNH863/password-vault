import { darkTheme, lightTheme } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTitleStyle: {
          fontSize: 20,
          color: colors.text,
        },
        tabBarActiveTintColor: colors.activeTint,
        tabBarInactiveTintColor: colors.inactiveTint,
        tabBarActiveBackgroundColor: colors.activeBackground,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: colors.headerBackground,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Main Screen",
          title: "Main Screen",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          headerTitle: "Settings",
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          headerShown: true,
          headerTitle: "Support",
          title: "Support",
          tabBarIcon: ({ color }) => (
            <Ionicons name="help-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
