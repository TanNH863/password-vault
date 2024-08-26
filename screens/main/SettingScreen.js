import React, { useState, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { PasswordContext } from '../../components/PasswordContext'
import { Backup, Restore } from '../../utils/BackupRestore';

export default function SettingScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setPasswordVisibility } = useContext(PasswordContext);
  const { passwords, loadPasswordInfo } = useContext(PasswordContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setPasswordVisibility(!isPasswordVisible);
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
      <TouchableOpacity style={styles.button} onPress={() => Backup(passwords)}>
        <Text style={styles.buttonText}>Backup Passwords</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => Restore(loadPasswordInfo)}>
        <Text style={styles.buttonText}>Restore Passwords</Text>
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
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});