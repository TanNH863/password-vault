import { PasswordContext } from "@/contexts/PasswordContext";
import { usePasswords } from "@/hooks/usePasswords";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PasswordList() {
  const { isPasswordVisible } = useContext(PasswordContext);
  const { passwords, removePasswordInfo } = usePasswords();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleDeletePress = (id: string) => {
    Alert.alert(
      "Delete Password",
      "Are you sure you want to delete this password?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            removePasswordInfo(id);
            Alert.alert("Delete Success!");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const toggleDropdown = (id: string) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  const handleEditPress = (item) => {
    router.push({
      pathname: "edit-password/[param]",
      params: {
        param: item.id,
        pswId: item.id,
        appname: item.appname,
        username: item.username,
        password: item.password,
        category: item.category,
      },
    });
  };

  const renderPasswordItem = ({ item }) => (
    <View key={item.id} style={styles.passwordItemContainer}>
      <TouchableOpacity
        style={styles.passwordItem}
        key={item.id}
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

  return (
    <FlatList
      data={passwords}
      keyExtractor={(item) => item.id}
      renderItem={renderPasswordItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  passwordItemContainer: {
    marginBottom: 10,
  },
  passwordItem: {
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
  buttonText: {
    color: "white",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  listContainer: {
    padding: 10,
  },
});
