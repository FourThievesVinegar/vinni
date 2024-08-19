import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChemhackticaDialog } from './components/Compounds/ChemhackticaDialog'
import { ContextWrapper } from './contexts'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { NewProject } from './components/NewProject'
import { Project } from './components/Project'
import { ProjectsList } from './components/ProjectsList'
import { ProjectsPage } from './components/ProjectsPage'
import { RecipeEditorDialog } from './components/Recipes/RecipeEditingDialog'
import { WelcomeDialog } from './components/WelcomeDialog'

import './App.scss'
import './styles/Dialog.scss'

function App() {
  return (
    <BrowserRouter>
      <ContextWrapper>
        <main>
          <WelcomeDialog />
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="projects" element={<ProjectsPage />}>
              <Route index element={<ProjectsList />} />
              <Route path="new" element={<NewProject />} />
              <Route path=":projectId" element={<Project />} />
            </Route>
          </Routes>
          <RecipeEditorDialog />
          <ChemhackticaDialog />
        </main>
      </ContextWrapper>
    </BrowserRouter>
  )
}

export default App
