import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function PasswordList({ passwords }) {
  const renderPasswordItem = ({ item }) => (
    <View style={styles.passwordItem}>
      <View style={styles.passwordInfo}>
        <Text style={styles.passwordText}>App/Site:</Text>
        <Text>{item.appname}</Text>
        <Text style={styles.passwordText}>Username:</Text>
        <Text>{item.username}</Text>
        <Text style={styles.passwordText}>Password:</Text>
        <Text>{item.password}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.revealButton}>
          <Text style={styles.buttonText}>Reveal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <FlatList
      data={passwords}
      keyExtractor={item => item.id}
      renderItem={renderPasswordItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  passwordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  passwordInfo: {
    flex: 1,
  },
  passwordText: {
    fontSize: 16,
    marginBottom: 4,
  },
  listContainer: {
    paddingTop: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  revealButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#4CD964',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
});