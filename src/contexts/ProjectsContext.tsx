import { createContext, useContext, useEffect, useState } from "react";
import { NoteType } from "./NotesContext";

interface ProjectsContextType {
  addCompoundToProject: (noteId: string, compoundId: string) => void;
  addNoteToProject: (noteId: string, projectId: string) => void;
  addRecipeToProject: (recipeId: string, projectId: string) => void;
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
  addCompoundToProject: () => null,
  addNoteToProject: () => null,
  addRecipeToProject: () => null,
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

const saveProjects = (projects: { string: ProjectType }) => {
  localStorage.setItem("vinni-projects", JSON.stringify(projects));
};

const loadProjects = () => {
  return JSON.parse(localStorage.getItem("vinni-projects") || "{}");
};

export const ProjectsProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<any>({});

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

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

  const addCompoundToProject = (compoundId: string, projectId: string) => {
    let newCompounds = projects[projectId]["notes"];
    newCompounds.push(compoundId);
    const newProjects = {
      ...projects,
      [projectId]: { ...projects[projectId], compounds: [...newCompounds] },
    };

    setProjects(newProjects);
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

  const addRecipeToProject = (recipeId: string, projectId: string) => {
    let newRecipes = projects[projectId]["recipes"];
    newRecipes.push(recipeId);
    const newProjects = {
      ...projects,
      [projectId]: { ...projects[projectId], recipes: [...newRecipes] },
    };

    setProjects(newProjects);
  };

  return (
    <ProjectsContext.Provider
      value={{
        addCompoundToProject,
        addNoteToProject,
        addRecipeToProject,
        createProject,
        projects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
