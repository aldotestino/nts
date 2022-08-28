import { Note } from '@prisma/client';

interface NoteCardProps {
  note: Note
  onDelete: (id: string) => void
}

function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="card rounded-none bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">
            {note.title}
          </h2>
          <div className="card-actions justify-end">
            <button onClick={() => onDelete(note.id)} className="btn btn-outline btn-square btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <p>
          {note.content}
        </p>
      </div>
    </div>);
}

export default NoteCard;