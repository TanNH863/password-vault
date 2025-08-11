import NoteList from "@/components/NoteList";
import PasswordList from "@/components/PasswordList";
import Selector from "@/components/Selector";
import { darkTheme, lightTheme } from "@/components/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { UsernameContext } from "@/contexts/UsernameContext";
import { useNotes } from "@/hooks/useNotes";
import { usePasswords } from "@/hooks/usePasswords";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MainScreen() {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState("passwords");
  const [open, setOpen] = useState(false);
  const { passwords, reload: reloadPasswords } = usePasswords();
  const { notes, reload: reloadNotes } = useNotes();
  const { setUsername } = useContext(UsernameContext);
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    const loadStoredUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
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
    const EmptyMessage = () => (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.text }]}>
          {type === "passwords"
            ? "No passwords added yet"
            : "No notes added yet"}
        </Text>
      </View>
    );

    if (type === "passwords")
      return isEmpty ? <EmptyMessage /> : <PasswordList />;
    if (type === "notes") return isEmpty ? <EmptyMessage /> : <NoteList />;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <RNPickerSelect
        onValueChange={(value) => handleSelectionChange(value)}
        items={[
          { label: "Passwords", value: "passwords" },
          { label: "Notes", value: "notes" },
        ]}
        style={{
          ...pickerSelectStyles,
          inputIOS: { ...pickerSelectStyles.inputIOS, color: colors.text },
          inputAndroid: {
            ...pickerSelectStyles.inputAndroid,
            color: colors.text,
          },
        }}
        value={selectedType}
      /> */}
      <Selector
        options={[
          { label: "Passwords", value: "passwords" },
          { label: "Notes", value: "notes" },
        ]}
        value={selectedType}
        onChange={(value) => handleSelectionChange(value)}
        color={colors.text}
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

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
