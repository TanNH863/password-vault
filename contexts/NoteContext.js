import React, { createContext, useState, useEffect } from 'react';
import { setupDatabase, getSecureNotes, deleteNote } from '../db/database'

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setupDatabase();
        loadSecureNotes();
    }, []);

    const loadSecureNotes = async () => {
        const notes = await getSecureNotes();
        setNotes(notes);
    };

    const removeNote = async (id) => {
        await deleteNote(id);
        loadSecureNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, loadSecureNotes, removeNote }}>
          {children}
        </NoteContext.Provider>
    );
}