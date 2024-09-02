import React, { createContext, useState, useEffect } from 'react';
import { setupDatabase, getDocumentList, addDocument } from '../db/database'
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export const DocumentsContext = createContext();

export const DocumentsProvider = ({ children }) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        setupDatabase();
        loadDocumentList();
    }, []);

    const loadDocumentList = async () => {
        const documents = await getDocumentList();
        setDocuments(documents);
    };

    const addNewDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
            if (result.type === "success") {
                const { uri, name } = result;
                const newUri = FileSystem.documentDirectory + name;

                // Save the file in the app's document directory
                await FileSystem.moveAsync({
                    from: uri,
                    to: newUri
                });

                await addDocument({ filename: name, filepath: newUri });
                loadDocumentList();
            }
        }
        catch (error) {
            console.error("Error adding document:", error);
        }
    };

    const removeDocument = async (id) => {
        const document = documents.find(doc => doc.id === id);
        if (document) {
          await FileSystem.deleteAsync(document.uri);
          await deleteDocument(id);
          loadDocumentList(); // Reload documents after deleting
        }
    };

    return (
        <DocumentsContext.Provider value={{ documents, loadDocumentList, addNewDocument, removeDocument }}>
          {children}
        </DocumentsContext.Provider>
    );
}