import React, { useContext, useState } from 'react';
import { View, Button, Text, FlatList } from 'react-native';
import { DocumentsContext } from '../../components/DocumentsContext';

export default function DocumentScreen() {
    const { documents, addNewDocument, removeDocument } = useContext(DocumentsContext);

    return (
        <View>
            <Button title="Add New Document" onPress={addNewDocument} />
            <FlatList
                data={documents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                    <Button title="Delete" onPress={() => removeDocument(item.id)} />
                </View>
                )}
            />
        </View>
    );
}