import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { PasswordContext } from '../../contexts/PasswordContext';
import { NoteContext } from '../../contexts/NoteContext';
import { UsernameContext } from '../../contexts/UsernameContext';
import PasswordList from '../../components/PasswordList';
import NoteList from '../../components/NoteList';

export default function MainScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState('passwords');
  const [modalVisible, setModalVisible] = useState(false);
  const { passwords, loadPasswordInfo } = useContext(PasswordContext);
  const { notes, loadSecureNotes } = useContext(NoteContext);
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
    }
  };

  const handleAddButtonPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => handleSelectionChange(value)}
        items={[
          { label: 'Passwords', value: 'passwords' },
          { label: 'Notes', value: 'notes' },
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddButtonPress}
      >
        <Ionicons name="add-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddPasswordScreen');
              }}
            >
              <Text style={styles.modalButtonText}>Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddNoteScreen');
              }}
            >
              <Text style={styles.modalButtonText}>Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#ddd' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
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
    marginBottom: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16
  }
});
