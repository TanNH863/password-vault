import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UsernameContext } from '../contexts/UsernameContext';

export default function GetInfoScreen({ navigation }) {
  const [input, setInput] = useState('');
  const { setUsername } = useContext(UsernameContext);

  const handleContinue = () => {
    if (input.trim()) {
      setUsername(input);
      navigation.navigate('SignUp');
    } else {
      alert('Please enter a valid username.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How should we call you?</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#0377BC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
