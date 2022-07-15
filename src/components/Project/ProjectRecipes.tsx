import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useRecipesContext } from "../../contexts/RecipesContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";

interface ProjectRecipesProps {
  projectRecipes: string[];
  projectId: string;
}

export const ProjectRecipes = ({
  projectRecipes = [],
  projectId,
}: ProjectRecipesProps) => {
  const { createRecipe, editRecipe, recipes } = useRecipesContext();
  const { addRecipeToProject } = useProjectsContext();

  const [newRecipeTitle, setNewRecipeText] = useState<string>("");

  const handleCreateRecipe = (title: string) => {
    const recipeId = createRecipe(title);
    addRecipeToProject(recipeId, projectId);
    editRecipe(recipeId);
  };

  const handleEditRecipe = (recipeId: string) => {
    editRecipe(recipeId);
  };

  return (
    <>
      <Accordion.Root type="multiple" className="projects-page-accordion">
        <Accordion.Item value="recipes">
          <Accordion.Header>
            <Accordion.Trigger>
              <h2>Recipes</h2>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ul>
              {projectRecipes.map((recipeId) => (
                <li key={recipeId}>
                  <button
                    onClick={() => {
                      handleEditRecipe(recipeId);
                    }}
                  >
                    {recipes[recipeId].title}
                  </button>
                </li>
              ))}
            </ul>
            {projectRecipes.length === 0 && <p>No recipes yet.</p>}
            <textarea
              value={newRecipeTitle}
              onChange={(e) => {
                setNewRecipeText(e.target.value);
              }}
            ></textarea>
            <button
              onClick={(e) => {
                handleCreateRecipe(newRecipeTitle);
                setNewRecipeText("");
              }}
            >
              New recipe
            </button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};
