import { PasswordContext } from "@/contexts/PasswordContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PasswordItemProps {
  item: {
    id: string;
    appname: string;
    username: string;
    password: string;
    category: string;
    created_at?: string;
  };
  selectedItemId: string | null;
  toggleDropdown: (id: string) => void;
  handleEditPress: (item: any) => void;
  handleDeletePress: (id: string) => void;
}

export default function PasswordItem({
  item,
  selectedItemId,
  toggleDropdown,
  handleEditPress,
  handleDeletePress,
}: PasswordItemProps) {
  const { isPasswordVisible } = useContext(PasswordContext);

  return (
    <View key={item.id} style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => toggleDropdown(item.id)}
      >
        <View style={styles.passwordInfo}>
          <Text style={styles.passwordText}>App/Site: {item.appname}</Text>
          <Text style={styles.passwordText}>Username: {item.username}</Text>
          <Text style={styles.passwordText}>
            Password: {isPasswordVisible ? item.password : "•••••••••••••"}
          </Text>
          <Text style={styles.passwordText}>Category: {item.category}</Text>
          <Text style={styles.passwordText}>Created: {item.created_at}</Text>
        </View>
      </TouchableOpacity>

      {selectedItemId === item.id && (
        <View style={styles.dropdownMenu}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditPress(item)}
            >
              <Ionicons name="create" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePress(item.id)}
            >
              <Ionicons name="trash" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  item: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordInfo: {
    flex: 1,
  },
  passwordText: {
    fontWeight: "bold",
  },
  dropdownMenu: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 4,
  },
  editButton: {
    backgroundColor: "#0377BC",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});
