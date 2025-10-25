"use client"
import { useEffect, useState } from "react"
import { useNotes } from "@/app/NotesContext";

type NoteType = {
    id: string;
    title: string;
    description: string;
}


export default function NoteModal() {
    const { selectedNote, closeModal, saveNote, deleteNote } = useNotes()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        const noteToSave = selectedNote ? { ...selectedNote, title, description } : { id: "new", title, description }
        saveNote(noteToSave)
    }

    const handleDelete = () => {
        if (selectedNote) {
            deleteNote(selectedNote as NoteType)
        }
    }

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setDescription(selectedNote.description)
            console.log("the is selectedNote", selectedNote)
        } else {
            setTitle("")
            setDescription("")
        }
    }, [selectedNote])

    return (
        <div className="fixed  inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">

            <div className="bg-white p-5 rounded-lg  w-full max-w-5xl mx-4 h-[90vh] flex flex-col">
                {/* Header */}
                <h2 className="text-2xl font-bold mb-4">{selectedNote ? 'Edit Note' : 'Add Note'}</h2>


                <div className="space-y-4 grow overflow-y-auto">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Note title"
                        />
                    </div>

                    <div className="flex flex-col h-full">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Note description"

                        ></textarea>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">Save Note</button>

                    <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>

                    {selectedNote && (<button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700 transition-colors">Delete</button>)}
                </div>
            </div>
        </div>
    )
}
