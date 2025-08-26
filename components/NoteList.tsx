import NoteItem from "@/components/NoteItem";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/Note";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";

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

  const handleEditPress = (item: Note) => {
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

  const handleViewPress = (item: Note) => {
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

  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => (
        <NoteItem
          item={item}
          selectedItemId={selectedItemId}
          toggleDropdown={toggleDropdown}
          handleViewPress={handleViewPress}
          handleEditPress={handleEditPress}
          handleDeletePress={handleDeletePress}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
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
