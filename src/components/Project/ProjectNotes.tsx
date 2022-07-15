import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useNotesContext } from "../../contexts/NotesContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";

interface ProjectNotesProps {
  projectNotes: string[];
  projectId: string;
}

export const ProjectNotes = ({
  projectNotes = [],
  projectId,
}: ProjectNotesProps) => {
  const { createNote, notes } = useNotesContext();
  const { addNoteToProject } = useProjectsContext();

  const [newNoteText, setNewNoteText] = useState<string>("");

  const handleCreateNote = (text: string) => {
    const noteId = createNote(text);
    addNoteToProject(noteId, projectId);
  };

  return (
    <>
      <Accordion.Root type="multiple" className="projects-page-accordion">
        <Accordion.Item value="notes">
          <Accordion.Header>
            <Accordion.Trigger>
              <h2>Notes</h2>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ul>
              {projectNotes.map((noteId) => (
                <li key={noteId}>{notes[noteId]}</li>
              ))}
            </ul>
            {projectNotes.length === 0 && <p>No notes yet.</p>}
            <textarea
              value={newNoteText}
              onChange={(e) => {
                setNewNoteText(e.target.value);
              }}
            ></textarea>
            <button
              onClick={(e) => {
                handleCreateNote(newNoteText);
                setNewNoteText("");
              }}
            >
              New note
            </button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};
