import { CompoundsProvider } from "./CompoundsContext";
import { NotesProvider } from "./NotesContext";
import { ProjectsProvider } from "./ProjectsContext";
import { RecipesProvider } from "./RecipesContext";

export const ContextWrapper = ({ children }: any) => {
  return (
    <NotesProvider>
      <CompoundsProvider>
        <RecipesProvider>
          <ProjectsProvider>{children}</ProjectsProvider>
        </RecipesProvider>
      </CompoundsProvider>
    </NotesProvider>
  );
};
