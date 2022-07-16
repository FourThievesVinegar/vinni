import { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface RecipesContextType {
  closeRecipeEditor: () => void;
  createRecipe: (title: string) => string;
  editingRecipe: string | null;
  editRecipe: (title: string) => void;
  recipes?: any;
}

export interface RecipeType {
  text: string;
}

const MESSAGE_TYPES = {
  RECIPE: "recipe",
  RECIPE_REQUEST: "recipe request",
};

export const RECIPE_EDITOR_URL =
  "https://recipe-press.netlify.app/?embedded=true";

const RecipesContext = createContext<RecipesContextType>({
  closeRecipeEditor: () => {},
  createRecipe: (text: string) => "",
  editingRecipe: null,
  editRecipe: (title: string) => {},
  recipes: {},
});

export const useRecipesContext = () => {
  const context = useContext(RecipesContext);

  if (!context) {
    console.log("ERROR! RecipesContext used outside its provider");
  }

  return context;
};

const saveRecipes = (recipes: { string: RecipeType }) => {
  localStorage.setItem("vinni-recipes", JSON.stringify(recipes));
};

const loadRecipes = () => {
  return JSON.parse(localStorage.getItem("vinni-recipes") || "{}");
};

export const RecipesProvider = ({ children }: any) => {
  const [recipes, setRecipes] = useState<any>({});
  const [editingRecipe, setEditingRecipe] = useState<string | null>(null);
  const [editorIFrame, setEditorIFrame] = useState<HTMLIFrameElement | null>(
    null
  );

  useEffect(() => {
    setRecipes(loadRecipes());
  }, []);

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  const createRecipe = (title: string) => {
    const recipeId = nanoid(12);
    updateRecipe(recipeId, { title, steps: [] });
    return recipeId;
  };

  const updateRecipe = (recipeId: string, recipe: any) => {
    const newRecipes = {
      ...recipes,
      [recipeId]: { ...recipe },
    };
    setRecipes(newRecipes);
  };

  const editRecipe = (recipeId: string) => {
    setEditingRecipe(recipeId);
    setEditorIFrame(
      document.getElementById("recipe-editor-iframe") as HTMLIFrameElement
    );
    document.addEventListener("message", handleMessageFromRecipeEditorIFrame);
  };

  const closeRecipeEditor = () => {
    setEditingRecipe(null);
    document.removeEventListener(
      "message",
      handleMessageFromRecipeEditorIFrame
    );
  };

  const handleMessageFromRecipeEditorIFrame = (event: any) => {
    console.log("MESSAGE FROM IFRAME", event);
    switch (event.data.type) {
      case MESSAGE_TYPES.RECIPE_REQUEST: {
        sendRecipeToEditorIFrame();
        return;
      }
      case MESSAGE_TYPES.RECIPE: {
        if (editingRecipe) {
          updateRecipe(editingRecipe, event.data.payload);
        }
      }
    }
  };

  const sendRecipeToEditorIFrame = () => {
    const message = {
      type: MESSAGE_TYPES.RECIPE,
      payload: editingRecipe ? recipes[editingRecipe] : {},
    };
    editorIFrame?.contentWindow?.postMessage(message);
  };

  return (
    <RecipesContext.Provider
      value={{
        closeRecipeEditor,
        createRecipe,
        editingRecipe,
        editRecipe,
        recipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
