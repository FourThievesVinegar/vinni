import { NotesProvider } from "./NotesContext";
import { ProjectsProvider } from "./ProjectsContext";

export const ContextWrapper = ({ children }: any) => {
  return (
    <NotesProvider>
      <ProjectsProvider>{children}</ProjectsProvider>
    </NotesProvider>
  );
};
