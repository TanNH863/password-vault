import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function NoteList({ notes }) {
    const renderNote = ({ item }) => (
        <View style={styles.noteItem}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => {/* Handle note actions here */}}>
            <Text style={styles.noteContent}>{item.content}</Text>
          </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
      padding: 10,
    },
    noteItem: {
      backgroundColor: '#f9f9f9',
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
    },
    noteTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    noteContent: {
      fontSize: 14,
      color: '#333',
    },
});