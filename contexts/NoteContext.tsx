import { deleteNote, getSecureNotes, setupDatabase } from "@/db/database";
import { Note } from "@/types/Note";
import React, { createContext, useEffect, useState } from "react";

interface NoteContextType {
  notes: any[];
  loadSecureNotes: () => Promise<void>;
  removeNote: (id: string) => Promise<void>;
}

export const NoteContext = createContext<NoteContextType>({
  notes: [],
  loadSecureNotes: async () => {},
  removeNote: async () => {},
});

export const NoteProvider = (children: React.ReactNode) => {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(() => {
    setupDatabase();
    loadSecureNotes();
  }, []);

  const loadSecureNotes = async () => {
    const notes = await getSecureNotes();
    setNotes(notes);
  };

  const removeNote = async (id: string) => {
    await deleteNote(id);
    loadSecureNotes();
  };

  return (
    <NoteContext.Provider value={{ notes, loadSecureNotes, removeNote }}>
      {children}
    </NoteContext.Provider>
  );
};
