import React, { useState, useContext } from 'react';
import { Alert, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NoteContext } from '../contexts/NoteContext';
import { useNavigation } from '@react-navigation/native';

export default function NoteList() {
  const { notes, removeNote } = useContext(NoteContext);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigation = useNavigation();

  const handleDeletePress = (id) => {
    Alert.alert(
      "Delete Password",
      "Are you sure you want to delete this password?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => removeNote(id)
        }
      ],
      { cancelable: false }
    );
  };

  const toggleDropdown = (id) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  const handleEditPress = (item) => {
    navigation.navigate('AddNoteScreen', { item });
  };

  const handleViewPress = (item) => {
    navigation.navigate('NoteViewScreen', { note: item });
  }

  const renderNoteItem = ({ item }) => (
    <View key={item.id} style={styles.noteItemContainer}>
      <TouchableOpacity style={styles.noteItem} key={item.id} onPress={() => toggleDropdown(item.id)}>
        <View style={styles.noteInfo}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <Text style={styles.noteContent}>{item.content}</Text>
        </View>
      </TouchableOpacity>
      {selectedItemId === item.id && (
      <View style={styles.dropdownMenu}>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => handleViewPress(item)}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => handleEditPress(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => handleDeletePress(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteInfo: {
    flex: 1,
  },
  dropdownMenu: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 4,
  },
  dropdownButton: {
    paddingVertical: 8,
  },
  buttonText: {
    color: '#007BFF',
  },
  listContainer: {
    padding: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
    color: '#333',
  },
});