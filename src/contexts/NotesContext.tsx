import { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface NotesContextType {
  addNote: (noteId: string, note: any) => void;
  addNotes: (notes: any) => void;
  createNote: (name: string) => string;
  notes?: any;
}

export interface NoteType {
  text: string;
}

const NotesContext = createContext<NotesContextType>({
  addNote: (noteId: string, note: any) => {},
  addNotes: (notes: any) => {},
  createNote: (text: string) => "",
  notes: {},
});

export const useNotesContext = () => {
  const context = useContext(NotesContext);

  if (!context) {
    console.log("ERROR! NotesContext used outside its provider");
  }

  return context;
};

const saveNotes = (notes: { string: NoteType }) => {
  localStorage.setItem("vinni-notes", JSON.stringify(notes));
};

const loadNotes = () => {
  return JSON.parse(localStorage.getItem("vinni-notes") || "{}");
};

export const NotesProvider = ({ children }: any) => {
  const [notes, setNotes] = useState<any>({});

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (noteId: string, note: any) => {
    const newNotes = {
      ...notes,
      [noteId]: note,
    };
    setNotes(newNotes);
  };

  const addNotes = (newNotes: any) => {
    setNotes({ ...notes, ...newNotes });
  };

  const createNote = (text: string) => {
    const noteId = nanoid(12);
    const newNotes = {
      ...notes,
      [noteId]: text,
    };
    setNotes(newNotes);
    return noteId;
  };

  return (
    <NotesContext.Provider value={{ addNote, addNotes, createNote, notes }}>
      {children}
    </NotesContext.Provider>
  );
};
