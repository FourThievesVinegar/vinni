import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useNotesContext } from "../../contexts/NotesContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";

import "./ProjectNotes.scss";

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
    if (text.length === 0) return;
    const noteId = createNote(text);
    addNoteToProject(noteId, projectId);
    setNewNoteText("");
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
                <li className="project-note" key={noteId}>
                  {notes[noteId]}
                </li>
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
