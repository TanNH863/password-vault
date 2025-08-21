import { darkTheme, lightTheme } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SettingsButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export default function SettingsButton({
  label,
  onPress,
  variant = "primary",
}: SettingsButtonProps) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const backgroundColor =
    variant === "primary" ? colors.primary : colors.secondary;
  const textColor = variant === "primary" ? colors.buttonText : colors.text;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});
