import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setupDatabase, getPasswordInfo } from './database';

export default function MainScreen({ navigation }) {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    setupDatabase();
    loadPasswordInfo();
  }, []);

  const loadPasswordInfo = () => {
    getPasswordInfo(data => {
      setPasswords(data);
    });
  };

  const renderPasswordItem = ({ item }) => (
    <View style={styles.passwordItem}>
      <View style={styles.passwordInfo}>
        <Text style={styles.passwordText}>App/Site: {item.appOrSiteName}</Text>
        <Text style={styles.passwordText}>Username: {item.username}</Text>
        <Text style={styles.passwordText}>Password: {item.password}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {passwords.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No passwords added yet</Text>
        </View>
      ) : (
        <FlatList
          data={passwords}
          keyExtractor={item => item.id}
          renderItem={renderPasswordItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPassword', { loadPasswordInfo })}
      >
        <Ionicons name="add-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
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
});
