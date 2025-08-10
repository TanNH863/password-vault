import { addNote, deleteNote, getAllNotes } from "@/db/database";
import { Note } from "@/types/Note";
import { useEffect, useState } from "react";

export function useNotes() {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(() => {
    loadNotes();
  });

  const loadNotes = async () => {
    const notes = await getAllNotes();
    setNotes(notes);
  };

  const addNewNote = async (note: Note) => {
    await addNote(note);
    loadNotes();
  };

  const removeNote = async (id: string) => {
    await deleteNote(id);
    loadNotes();
  };

  return {
    notes,
    addNewNote,
    removeNote,
    reload: loadNotes,
  };
}
