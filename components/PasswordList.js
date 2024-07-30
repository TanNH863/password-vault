import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { PasswordContext } from '../components/PasswordContext';
import { useNavigation } from '@react-navigation/native';

export default function PasswordList() {
  const { passwords, removePasswordInfo } = useContext(PasswordContext);
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
          onPress: () => removePasswordInfo(id)
        }
      ],
      { cancelable: false }
    );
  };

  const toggleDropdown = (id) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  const handleEditPress = (item) => {
    navigation.navigate('AddPasswordScreen', { item });
  };

  const renderPasswordItem = ({ item }) => (
    <View key={item.id} style={styles.passwordItemContainer}>
      <TouchableOpacity style={styles.passwordItem} key={item.id} onPress={() => toggleDropdown(item.id)}>
      <View style={styles.passwordInfo}>
        <Text style={styles.passwordText}>App/Site: {item.appname}</Text>
        <Text style={styles.passwordText}>Username: {item.username}</Text>
        <Text style={styles.passwordText}>Password: {item.password}</Text>
      </View>
    </TouchableOpacity>
    {selectedItemId === item.id && (
      <View style={styles.dropdownMenu}>
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
      data={passwords}
      keyExtractor={item => item.id}
      renderItem={renderPasswordItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  passwordItemContainer: {
    marginBottom: 10,
  },
  passwordItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordInfo: {
    flex: 1,
  },
  passwordText: {
    fontWeight: 'bold',
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
    padding: 16,
  },
});