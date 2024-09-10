import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function UserSupportScreen() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendSupportRequest = () => {
        if (!email || !message) {
            Alert.alert('Error', 'Please fill out both fields.');
            return;
        }
        // Implement support request handling logic here, e.g., sending an email or making an API call
        Alert.alert('Support Request Sent', 'Your request has been sent successfully.');
        setEmail('');
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Support</Text>
            <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.textArea}
                placeholder="Your Message"
                value={message}
                onChangeText={setMessage}
                multiline
            />
            <Button title="Send" onPress={handleSendSupportRequest} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f7f7f7',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    textArea: {
      height: 100,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      textAlignVertical: 'top',
    },
});