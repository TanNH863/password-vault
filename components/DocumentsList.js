import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function DocumentsList({ documents }) {
    const renderDocument = ({ item }) => (
        <View style={styles.documentItem}>
          <Text style={styles.documentTitle}>{item.filename}</Text>
          <TouchableOpacity onPress={() => {/* Handle document actions like open, delete, etc. */}}>
            <Text style={styles.documentSize}>{item.size} KB</Text>
          </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
          data={documents}
          renderItem={renderDocument}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
      padding: 10,
    },
    documentItem: {
      backgroundColor: '#f9f9f9',
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
    },
    documentTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    documentSize: {
      fontSize: 14,
      color: '#333',
    },
});