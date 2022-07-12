import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { NewProject } from "./components/NewProject";
import { Project } from "./components/Project";
import { ProjectsList } from "./components/ProjectsList";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<ProjectsList />}>
            <Route path=":projectId" element={<Project />} />
            <Route path="new" element={<NewProject />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
