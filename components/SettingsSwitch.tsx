import { darkTheme, lightTheme } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface SettingsSwitchProps {
  label: string;
  value: boolean;
  onValueChange: () => void;
}

export default function SettingsSwitch({
  label,
  value,
  onValueChange,
}: SettingsSwitchProps) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View
        style={
          theme === "dark"
            ? { shadowColor: "#3399FF", shadowOpacity: 0.6, shadowRadius: 4 }
            : {}
        }
      >
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: colors.switchOff,
            true: colors.switchOn,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
  },
});
