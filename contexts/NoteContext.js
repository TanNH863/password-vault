import React, { createContext, useState, useEffect } from 'react';
import { setupDatabase, getSecureNotes, addSecureNote } from '../db/database'

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

    const addNote = async (title, content) => {
        await addSecureNote({
          title,
          content,
        });
        loadSecureNotes();
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, loadSecureNotes }}>
          {children}
        </NoteContext.Provider>
    );
}