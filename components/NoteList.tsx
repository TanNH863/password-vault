import { useNotes } from "@/hooks/useNotes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NoteList() {
  const { notes, removeNote } = useNotes();
  const [selectedItemId, setSelectedItemId] = useState<string | null>("");

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
            removeNote(id);
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

  const handleEditPress = (item: {
    id: string;
    title: string;
    content: string;
    category: string;
  }) => {
    router.push({
      pathname: "edit-note/[param]",
      params: {
        param: item.id,
        noteId: item.id,
        title: item.title,
        content: item.content,
        category: item.category,
      },
    });
  };

  const handleViewPress = (item: {
    id: string;
    title: string;
    content: string;
    category: string;
  }) => {
    router.push({
      pathname: "note-view/[param]",
      params: {
        param: item.id,
        noteId: item.id,
        title: item.title,
        content: item.content,
        category: item.category,
      },
    });
  };

  const renderNoteItem = ({ item }) => (
    <View key={item.id} style={styles.noteItemContainer}>
      <TouchableOpacity
        style={styles.noteItem}
        key={item.id}
        onPress={() => toggleDropdown(item.id)}
      >
        <View style={styles.noteInfo}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <Text style={styles.noteContent}>{item.content}</Text>
          <Text style={styles.noteContent}>Created: {item.created_at}</Text>
          <Text style={styles.noteContent}>{item.category}</Text>
        </View>
      </TouchableOpacity>
      {selectedItemId === item.id && (
        <View style={styles.dropdownMenu}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleViewPress(item)}
            >
              <Ionicons name="eye-sharp" size={24} color="#fff" />
            </TouchableOpacity>
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
      data={notes}
      renderItem={renderNoteItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  noteItemContainer: {
    marginBottom: 10,
  },
  noteItem: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteInfo: {
    flex: 1,
  },
  dropdownMenu: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 4,
  },
  viewButton: {
    backgroundColor: "#0377BC",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
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
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
    color: "#333",
  },
});
