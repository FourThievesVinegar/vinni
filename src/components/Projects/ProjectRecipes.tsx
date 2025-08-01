import { ChangeEvent, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { useRecipesContext } from '../../contexts/RecipesContext'
import { useProjectsContext } from '../../contexts/ProjectsContext'

import './ProjectRecipes.scss'

interface ProjectRecipesProps {
  projectRecipes: string[]
  projectId: string
}

export const ProjectRecipes = ({ projectRecipes = [], projectId }: ProjectRecipesProps) => {
  const { createRecipe, editRecipe, recipes } = useRecipesContext()
  const { addRecipeToProject } = useProjectsContext()

  const [newRecipeTitle, setNewRecipeText] = useState<string>('')

  const handleCreateRecipe = (title: string) => {
    if (title.length === 0) return

    const recipeId = createRecipe(title, {})
    addRecipeToProject(recipeId, projectId)
    editRecipe(recipeId)
    setNewRecipeText('')
  }

  const handleUploadRecipe = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    const file = e?.target?.files?.item(0)

    fileReader.addEventListener('load', () => {
      const importObject = fileReader.result ? JSON.parse(fileReader.result as string) : null
      if (importObject) {
        console.log(importObject)
        const recipeId = createRecipe(newRecipeTitle, importObject)
        addRecipeToProject(recipeId, projectId)
      }
    })
    if (file) {
      fileReader.readAsText(file)
    }
    if (e?.target) {
      e.target.value = ''
    }
  }

  const handleEditRecipe = (recipeId: string) => {
    editRecipe(recipeId)
  }

  return (
    <>
      <Accordion.Root
        type="multiple"
        className="projects-page-accordion"
        defaultValue={['recipes']}
      >
        <Accordion.Item value="recipes">
          <Accordion.Header>
            <Accordion.Trigger>
              <h2 className="title-font">Recipes</h2>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ul className="project-recipes">
              {projectRecipes?.map(recipeId => (
                <li key={recipeId}>
                  <button
                    className="open-recipe-button"
                    onClick={() => {
                      handleEditRecipe(recipeId)
                    }}
                  >
                    {recipes[recipeId]?.title}
                  </button>
                </li>
              ))}
            </ul>
            {projectRecipes.length === 0 && <p>No recipes yet.</p>}
            <input
              className="new-recipe-name"
              placeholder="New Recipe Name"
              value={newRecipeTitle}
              onChange={e => {
                setNewRecipeText(e.target.value)
              }}
            />
            <button
              disabled={newRecipeTitle.length === 0}
              onClick={e => {
                handleCreateRecipe(newRecipeTitle)
              }}
            >
              Create New Recipe
            </button>
            <div className="input-wrapper">
              <label htmlFor="import-file">Import Recipe</label>{' '}
              <input
                type="file"
                id="myFile"
                name="import-file"
                onChange={e => {
                  handleUploadRecipe(e)
                }}
              />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  )
}
