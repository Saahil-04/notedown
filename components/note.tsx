"use client"

type NoteProps = {
    title: string;
    description: string;
}

export default function Note({ title, description }: NoteProps) {
    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200 w-full truncate">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 ">
                {title || "Untitled Note"}
            </h3>
            <p className="text-gray-600 text-sm">
                {description || "No description provided."}
            </p>
           
        </div>
    )
}