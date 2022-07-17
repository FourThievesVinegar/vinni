import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useRecipesContext } from "../../contexts/RecipesContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";

import "./ProjectRecipes.scss";

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
    if (title.length === 0) return;

    const recipeId = createRecipe(title);
    addRecipeToProject(recipeId, projectId);
    editRecipe(recipeId);
    setNewRecipeText("");
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
            <h4>Available Recipes</h4>
            <ul className="project-recipes">
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
            <input
              className="new-recipe-name"
              placeholder="New Recipe Name"
              value={newRecipeTitle}
              onChange={(e) => {
                setNewRecipeText(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                handleCreateRecipe(newRecipeTitle);
              }}
            >
              Create New Recipe
            </button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};
