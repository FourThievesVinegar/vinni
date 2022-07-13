import { createContext, useContext, useState } from "react";

interface ProjectsContextType {
  createProject: (name: string) => string | null;
  projects?: any;
}

interface ProjectType {
  name: string;
  // notes: NoteType[],
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

  return (
    <ProjectsContext.Provider value={{ createProject, projects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
