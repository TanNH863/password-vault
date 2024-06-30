import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { setupDatabase, getPasswordInfo, insertPasswordInfo } from '../db/database';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function HomeScreen() {
  const [passwordInfo, setPasswordInfo] = useState([]);

  const loadPasswordInfo = () => {
    getPasswordInfo()
      .then(data => setPasswordInfo(data))
      .catch(error => console.log('Error fetching data:', error));
  };

  const addSampleData = () => {
    insertPasswordInfo('SampleApp', 'sampleuser', 'samplepass')
      .then(() => loadPasswordInfo())
      .catch(error => console.log('Error inserting data:', error));
  };

  useEffect(() => {
    setupDatabase();
    loadPasswordInfo();
  }, []);

  return (
    <View style={styles.container}>
      {passwordInfo.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>App or site name</Text>
          <Text>{item.appname}</Text>
          <Text>Username</Text>
          <Text>{item.username}</Text>
          <Text>Password</Text>
          <Text>{item.password}</Text>
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
      ))}
      <TouchableOpacity style={styles.addCard} onPress={addSampleData}>
        <Text style={styles.addText}>+</Text>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  buttonText: {
    color: 'white',
  },
  addCard: {
    width: '80%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  addText: {
    fontSize: 24,
    color: '#a9a9a9',
  },
});