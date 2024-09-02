import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { PasswordContext } from '../../contexts/PasswordContext';
import { NoteContext } from '../../contexts/NoteContext';
import { DocumentsContext } from '../../contexts/DocumentsContext';
import { UsernameContext } from '../../contexts/UsernameContext';
import PasswordList from '../../components/PasswordList';
import NoteList from '../../components/NoteList';
import DocumentsList from '../../components/DocumentsList';

export default function MainScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState('passwords');
  const { passwords, loadPasswordInfo } = useContext(PasswordContext);
  const { notes, loadSecureNotes } = useContext(NoteContext);
  const { documents, loadDocumentList } = useContext(DocumentsContext);
  const { username } = useContext(UsernameContext);

  useEffect(() => {
    loadPasswordInfo();
    navigation.setOptions({
      title: `Welcome, ${username}`,
    });
  }, [navigation, username]);

  const handleSelectionChange = (value) => {
    setSelectedType(value);
    switch (value) {
      case 'passwords':
        loadPasswordInfo();
        break;
      case 'notes':
        loadSecureNotes();
        break;
      case 'documents':
        loadDocumentList();
        break;
    }
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => handleSelectionChange(value)}
        items={[
          { label: 'Passwords', value: 'passwords' },
          { label: 'Notes', value: 'notes' },
          { label: 'Documents', value: 'documents' },
        ]}
        style={pickerSelectStyles}
        value={selectedType}
      />

      {selectedType === 'passwords' && (
        passwords.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No passwords added yet</Text>
          </View>
        ) : ( <PasswordList passwords={passwords} /> )
      )}

      {selectedType === 'notes' && (
        notes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notes added yet</Text>
          </View>
        ) : ( <NoteList notes={notes} /> )
      )}

      {selectedType === 'documents' && (
        documents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No documents added yet</Text>
          </View>
        ) : (
          <DocumentsList documents={documents} />
        )
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPasswordScreen')}
      >
        <Ionicons name="add-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10, // Add some margin to the dropdown
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10, // Add some margin to the dropdown
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#aaa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0377BC',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
