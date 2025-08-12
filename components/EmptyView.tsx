import { darkTheme, lightTheme } from "@/components/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { Image, StyleSheet, Text, View } from "react-native";

interface EmptyViewProps {
  message: string;
}

export default function EmptyView({ message }: EmptyViewProps) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  return (
    <View style={styles.container}>
      <Image
        style={styles.emptyLogo}
        source={require("@/assets/images/empty.png")}
      />
      <Text style={[styles.emptyText, { color: colors.text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyLogo: {
    width: 80,
    height: 80,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
