import { Note } from "@/types/Note";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NoteItemProps {
  item: Note;
  selectedItemId: string | null;
  toggleDropdown: (id: string) => void;
  handleViewPress: (item: any) => void;
  handleEditPress: (item: any) => void;
  handleDeletePress: (id: string) => void;
}

export default function NoteItem({
  item,
  selectedItemId,
  toggleDropdown,
  handleViewPress,
  handleEditPress,
  handleDeletePress,
}: NoteItemProps) {
  return (
    <View key={item.id} style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        key={item.id}
        onPress={() => toggleDropdown(item.id)}
      >
        <View style={styles.noteInfo}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <Text style={styles.noteContent}>{item.content}</Text>
          <Text style={styles.noteContent}>Created: {item.created_at}</Text>
          <Text style={styles.noteContent}>Category: {item.category}</Text>
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
  noteInfo: {
    flex: 1,
  },
  dropdownMenu: {
    padding: 10,
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
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
