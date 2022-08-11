import { createContext, useContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { nanoid } from "nanoid";

import { useCompoundsContext } from "./CompoundsContext";
import { NoteType, useNotesContext } from "./NotesContext";
import { useRecipesContext } from "./RecipesContext";

interface ProjectsContextType {
  addCompoundToProject: (noteId: string, compoundId: string) => void;
  addNoteToProject: (noteId: string, projectId: string) => void;
  addRecipeToProject: (recipeId: string, projectId: string) => void;
  addReactionToProject: (reactionId: string, projectId: string) => void;
  createProject: (name: string) => string;
  exportProject: (projectId: string) => void;
  importProject: (importObject: any) => void;
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
  addReactionToProject: () => null,
  createProject: () => "",
  exportProject: () => null,
  importProject: () => null,
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

  const { compounds, reactions, addCompounds, addReactions } =
    useCompoundsContext();
  const { notes, addNotes } = useNotesContext();
  const { recipes, addRecipes } = useRecipesContext();

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const createProject = (name: string) => {
    const projectId = nanoid(12);
    const newProjects = {
      ...projects,
      [projectId]: {
        name,
        notes: [],
        compounds: [],
        pathways: [],
        reactions: [],
        recipes: [],
      },
    };
    setProjects(newProjects);
    return projectId;
  };

  const exportProject = (projectId: string) => {
    let exportObject: { [key: string]: { [key: string]: {} } } = {
      compounds: {},
      notes: {},
      reactions: {},
      recipes: {},
      projects: {},
    };

    const items: { [key: string]: { [key: string]: {} } } = {
      compounds,
      notes,
      reactions,
      recipes,
    };

    Object.keys(items).forEach((type) => {
      projects[projectId][type].forEach((id: string) => {
        const item = items[type][id];
        if (item) {
          exportObject[type][id] = item;
        }
      });
    });

    exportObject.projects = {
      [projectId]: { ...projects[projectId] },
    };

    saveAs(
      new Blob([JSON.stringify(exportObject)], { type: "application/json" }),
      `${projects[projectId].name}-${projectId}.4tv`
    ); // Export JSON file of the project
  };

  const importProject = (importObject: any) => {
    addCompounds(importObject.compounds);
    addNotes(importObject.notes);
    addReactions(importObject.reactions);
    addRecipes(importObject.recipes);

    setProjects({ ...projects, ...importObject.projects });
  };

  const addCompoundToProject = (compoundId: string, projectId: string) => {
    let newCompounds = projects[projectId]["compounds"];
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

  const addReactionToProject = (reactionId: string, projectId: string) => {
    let newReactions = projects[projectId]["reactions"];
    newReactions.push(reactionId);
    const newProjects = {
      ...projects,
      [projectId]: { ...projects[projectId], reactions: [...newReactions] },
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
        addReactionToProject,
        addRecipeToProject,
        createProject,
        exportProject,
        importProject,
        projects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
