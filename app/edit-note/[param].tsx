import { darkTheme, lightTheme } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { updateNote } from "@/db/database";
import { useNotes } from "@/hooks/useNotes";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function EditNoteScreen() {
  const { noteId, title, content, category } = useLocalSearchParams<{
    noteId: string;
    title: string;
    content: string;
    category: string;
  }>();
  const { theme } = useTheme();
  const { reload } = useNotes();
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedCategory, setEditedCategory] = useState(category);
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const handleSave = async () => {
    if (!title || !content) {
      Alert.alert("Error", "Please fill out both fields");
      return;
    }

    // get current timestamp in ISO format
    const created_at = new Date().toISOString();

    try {
      await updateNote(
        noteId,
        editedTitle,
        editedContent,
        editedCategory,
        created_at
      );
      Alert.alert("Success", "Note updated successfully");
      reload();
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update info");
      console.error("Error updating info: ", error);
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
        onChangeText={setEditedTitle}
        placeholder="Enter note title"
      />
      <Text style={[styles.label, { color: colors.text }]}>Note Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setEditedContent}
        placeholder="Enter note content"
        multiline
        numberOfLines={5}
      />
      <Text style={[styles.label, { color: colors.text }]}>Category</Text>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={category}
        onChangeText={setEditedCategory}
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
