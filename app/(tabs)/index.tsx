import SegmentedControl from "@/components/Controller";
import EmptyView from "@/components/EmptyView";
import NoteList from "@/components/NoteList";
import PasswordList from "@/components/PasswordList";
import { darkTheme, lightTheme } from "@/components/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { useNotes } from "@/hooks/useNotes";
import { usePasswords } from "@/hooks/usePasswords";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MainScreen() {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState("passwords");
  const [open, setOpen] = useState(false);
  const { passwords, reload: reloadPasswords } = usePasswords();
  const { notes, reload: reloadNotes } = useNotes();
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    const loadStoredUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        navigation.setOptions({ title: `Welcome, ${storedUsername}` });
      }
    };

    reloadPasswords();
    loadStoredUsername();
  }, [navigation]);

  const handleSelectionChange = (value: string) => {
    setSelectedType(value);
    switch (value) {
      case "passwords":
        reloadPasswords();
        break;
      case "notes":
        reloadNotes();
        break;
    }
  };

  const renderContent = (type: string, data: any[]) => {
    const isEmpty = data.length === 0;
    if (type === "passwords") {
      return isEmpty ? (
        <EmptyView message="No passwords added yet" />
      ) : (
        <PasswordList />
      );
    }
    if (type === "notes") {
      return isEmpty ? (
        <EmptyView message="No notes added yet" />
      ) : (
        <NoteList />
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SegmentedControl
        options={[
          { label: "Passwords", value: "passwords" },
          { label: "Notes", value: "notes" },
        ]}
        value={selectedType}
        onChange={(value) => handleSelectionChange(value)}
        backgroundColor="#0377BC"
        activeColor={colors.text}
        inactiveColor={colors.text}
      />

      {renderContent(
        selectedType,
        selectedType === "passwords" ? passwords : notes
      )}

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setOpen(true)}
      >
        <Ionicons name="add-outline" size={24} color={colors.buttonText} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.modalBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Add New
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                setOpen(false);
                router.push("/add-password");
              }}
            >
              <Text
                style={[styles.modalButtonText, { color: colors.buttonText }]}
              >
                Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                setOpen(false);
                router.push("/add-note");
              }}
            >
              <Text
                style={[styles.modalButtonText, { color: colors.buttonText }]}
              >
                Note
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.secondary },
              ]}
              onPress={() => setOpen(false)}
            >
              <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
  },
});
