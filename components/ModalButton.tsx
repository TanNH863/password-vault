import { darkTheme, lightTheme } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ModalButtonProps {
  label: string;
  onPress: () => void;
}

export default function ModalButton({ label, onPress }: ModalButtonProps) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const themeValidation = () =>
    label === "Cancel" ? (theme === "dark" ? "#FFF" : "#333") : "#FFF";
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:
            label === "Cancel" ? colors.secondary : colors.primary,
        },
      ]}
      onPress={onPress}
    >
      <Text style={{ fontSize: 16, color: themeValidation() }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    color: "#fff",
    fontSize: 16,
  },
});
