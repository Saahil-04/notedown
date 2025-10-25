"use client"

import Note from "@/components/note";
import NoteModal from "@/components/noteModal";
import { NotesProvider, useNotes } from "./NotesContext";

type Note = {
  id: string;
  title: string;
  description: string;
}

function NoteList() {

  const { notes, isModalOpen, openModal } = useNotes();

  return (
    <div className="relative min-h-screen bg-zinc-50 font-sans p-4">

      <button onClick={() => openModal()} className="absolute top-4 right-4 p-3 bg-emerald-600 text-white rounded-md shadow-md hover:bg-emerald-700 transition-colors">
        Add Note
      </button>

      {isModalOpen && <NoteModal />}

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {notes.map((note) => {
          return (
            <div key={note.id} onClick={() => openModal(note)} className="w-full cursor-pointer">
              <Note title={note.title} description={note.description} />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <NotesProvider>
      <NoteList />
    </NotesProvider>
  )
}