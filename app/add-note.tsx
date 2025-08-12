import { darkTheme, lightTheme } from "@/components/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/Note";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function AddNoteScreen() {
  const { reload, addNewNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const handleSave = async () => {
    // generate random id
    const id = uuidv4();

    // get current timestamp in ISO format
    const created_at = new Date().toISOString();

    if (!title || !content) {
      Alert.alert("Error", "Please fill out both fields");
      return;
    }

    try {
      let note = new Note(id, title, content, category, created_at);
      await addNewNote(note);
      Alert.alert("Success", "Note added successfully");
      reload();
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to add note");
      console.error("Error adding note: ", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.label, { color: colors.text }]}>Note Title</Text>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter note title"
      />
      <Text style={[styles.label, { color: colors.text }]}>Note Content</Text>
      <TextInput
        style={[styles.input, styles.textArea, { color: colors.text }]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter note content"
        multiline
        numberOfLines={5}
      />
      <Text style={[styles.label, { color: colors.text }]}>Category</Text>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        onPress={handleSave}
      >
        <Text style={[styles.saveButtonText, { color: colors.buttonText }]}>
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
  },
  saveButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
  },
});
