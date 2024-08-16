import React, { useState, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PasswordContext } from '../../components/PasswordContext'

export default function SettingScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setPasswordVisibility } = useContext(PasswordContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleGoogleSync = () => {
    Alert.alert('Syncing...', 'Syncing with Google Password Manager...');
    // Here, implement the syncing logic with Google Password Manager.
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Show Passwords</Text>
        <Switch
          value={isPasswordVisible}
          onValueChange={togglePasswordVisibility}
        />
      </View>
      
      <TouchableOpacity style={styles.syncButton} onPress={handleGoogleSync}>
        <Text style={styles.syncButtonText}>Sync with Google Password Manager</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  optionText: {
    fontSize: 18,
  },
  syncButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});