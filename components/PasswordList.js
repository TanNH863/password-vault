import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function PasswordList({ passwords }) {
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
});