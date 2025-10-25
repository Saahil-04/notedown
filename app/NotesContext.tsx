"use client"

import Note from "@/components/note";
import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from "react";

type Note = {
    id: string;
    title: string;
    description: string;
}

type NotesContextType = {
    notes: Note[];
    isModalOpen: boolean;
    selectedNote: Note | null;
    openModal: (note?: Note) => void;
    closeModal: () => void;
    saveNote: (note: Note) => void;
    deleteNote: (note:Note) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {

    const [notes, setNotes] = useState<Note[]>(() => {
        if (typeof (window) !== "undefined") {
            const storedNotes = localStorage.getItem("notes");
            return storedNotes ? JSON.parse(storedNotes) : [];
        }
        return [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);


    const openModal = useCallback((note: Note | undefined) => {
        setSelectedNote(note ?? null)
        setIsModalOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
        setSelectedNote(null)
    }, [])

    const saveNote = useCallback((noteToSave: Note) => {
        if (selectedNote) {
            setNotes(prevNotes => prevNotes.map(note => note.id === selectedNote.id ? noteToSave : note))
        } else {
            const newNote = { ...noteToSave, id: Date.now().toString() }
            setNotes(prevNotes => [...prevNotes, newNote])
        }
        closeModal()
    }, [selectedNote, closeModal]);

    const deleteNote = useCallback((noteToDelete: Note) => {
        setNotes(notes => notes.filter((note) => note.id !== noteToDelete.id))
        closeModal()
    }, [closeModal])

    useEffect(() => {
        console.log("The notes: ", notes)
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])


    const value = {
        notes,
        isModalOpen,
        selectedNote,
        openModal,
        closeModal,
        saveNote,
        deleteNote
    }


    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider >
    )
}

export function useNotes() {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error("useNotes must be used inside NotesProvider")
    }
    return context;
}