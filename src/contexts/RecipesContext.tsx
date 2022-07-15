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

export const RECIPE_EDITOR_URL = "https://recipe-press.netlify.app/";

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

  useEffect(() => {
    setRecipes(loadRecipes());
  }, []);

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  const createRecipe = (title: string) => {
    const recipeId = nanoid(12);
    const newRecipes = {
      ...recipes,
      [recipeId]: { title },
    };
    setRecipes(newRecipes);
    return recipeId;
  };

  const editRecipe = (recipeId: string) => {
    setEditingRecipe(recipeId);
  };

  const closeRecipeEditor = () => {
    setEditingRecipe(null);
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
