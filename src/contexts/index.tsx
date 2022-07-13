import { ProjectsProvider } from "./ProjectsContext";

export const ContextWrapper = ({ children }: any) => {
  return <ProjectsProvider>{children}</ProjectsProvider>;
};
