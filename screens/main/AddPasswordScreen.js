import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { insertPasswordInfo } from '../../db/database';
import { PasswordInfo } from '../../models/PasswordInfo';
import { PasswordContext } from '../../components/PasswordContext';

export default function AddPasswordScreen({ navigation }) {
  const { loadPasswordInfo } = useContext(PasswordContext);
  const [id, setID] = useState('');
  const [appname, setAppname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    if (appname && username && password) {
      try {
        let passwordInfo = new PasswordInfo(id, appname, username, password);
        await insertPasswordInfo(passwordInfo);
        Alert.alert('Success', 'Info added successfully');
        loadPasswordInfo();
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Failed to add info');
        console.error('Error adding info: ', error);
      }
    } else {
      Alert.alert('Warning', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>App or Site Name</Text>
      <TextInput
        style={styles.input}
        value={appname}
        onChangeText={setAppname}
      />
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#0377BC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
