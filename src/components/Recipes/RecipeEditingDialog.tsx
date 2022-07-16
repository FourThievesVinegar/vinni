import * as Dialog from "@radix-ui/react-dialog";

import {
  useRecipesContext,
  RECIPE_EDITOR_URL,
} from "../../contexts/RecipesContext";

import loaderSmashy from "../../images/loader-smashy.gif";

export const RecipeEditorDialog = () => {
  const { closeRecipeEditor, editingRecipe, recipes } = useRecipesContext();

  const recipeTitle = editingRecipe && recipes[editingRecipe].title;

  return (
    <Dialog.Root open={editingRecipe !== null}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="dialog-header">
            <Dialog.Title>Editing {recipeTitle}</Dialog.Title>{" "}
            <Dialog.Close onClick={() => closeRecipeEditor()}>X</Dialog.Close>
          </div>
          <div
            className="dialog-body"
            style={{
              backgroundImage: `url(${loaderSmashy})`,
              backgroundPosition: "center",
            }}
          >
            <iframe
              id="recipe-editor-iframe"
              src={RECIPE_EDITOR_URL}
              title="Recipe Editor"
              className="dialog-iframe"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
