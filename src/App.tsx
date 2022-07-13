import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextWrapper } from "./contexts";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { NewProject } from "./components/NewProject";
import { Project } from "./components/Project";
import { ProjectsList } from "./components/ProjectsList";
import { ProjectsPage } from "./components/ProjectsPage";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <ContextWrapper>
        <main>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="projects" element={<ProjectsPage />}>
              <Route index element={<ProjectsList />} />
              <Route path="new" element={<NewProject />} />
              <Route path=":projectId" element={<Project />} />
            </Route>
          </Routes>
        </main>
      </ContextWrapper>
    </BrowserRouter>
  );
}

export default App;
