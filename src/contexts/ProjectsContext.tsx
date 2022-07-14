import { chownSync } from "fs";
import { createContext, useContext, useEffect, useState } from "react";
import { NoteType } from "./NotesContext";

interface ProjectsContextType {
  addNoteToProject: (noteId: string, projectId: string) => void;
  createProject: (name: string) => string | null;
  projects?: any;
}

interface ProjectType {
  name: string;
  notes: NoteType[];
  // compounds: CompoundType[],
  // pathways: PathwayType[],
}

/*
interface CompoundType {
  name: string,
  smilesString: string,
}
*/

/*
interface PathwayType {
  name: string,
  reactions: ReactionType[],
}
*/

/*
interface ReactionType {
  name: string,
  inputs: CompoundType[],
  outputs: CompoundType[],
}
*/

/*
interface RecipeType {
  name: string,
  steps: StepType[],
}
*/

/*
interface StepType {
  message: string,
  details?: string,
  done: boolean,
  icon?: string,
  options?: StepOptionType[],
  baseTask?: string,
  next?: number,
}
*/

/*
interface StepOptionType {
  next: number,
  text: string,
}
*/

const ProjectsContext = createContext<ProjectsContextType>({
  addNoteToProject: () => null,
  createProject: () => null,
  projects: {},
});

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    console.log("ERROR! ProjectsContext used outside its provider");
  }

  return context;
};

export const ProjectsProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<any>({});

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    saveProjects();
  }, [projects]);

  const saveProjects = () => {
    localStorage.setItem("vinni-projects", JSON.stringify(projects));
  };

  const loadProjects = () => {
    setProjects(JSON.parse(localStorage.getItem("vinni-projects") || "{}"));
  };

  const createProject = (name: string) => {
    if (projects[name]) {
      return "Project with that name already exists!";
    }
    const newProjects = {
      ...projects,
      [name]: { notes: [], compounds: [], pathways: [], recipes: [] },
    };
    setProjects(newProjects);
    return null;
  };

  const addNoteToProject = (noteId: string, projectId: string) => {
    let newNotes = projects[projectId]["notes"];
    newNotes.push(noteId);
    const newProjects = {
      ...projects,
      [projectId]: { ...projects[projectId], notes: [...newNotes] },
    };

    setProjects(newProjects);
  };

  return (
    <ProjectsContext.Provider
      value={{ addNoteToProject, createProject, projects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
