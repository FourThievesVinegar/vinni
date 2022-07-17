import { Link, useNavigate } from "react-router-dom";

import { useProjectsContext } from "../contexts/ProjectsContext";

export const ProjectsList = () => {
  const { projects, importProject } = useProjectsContext();
  const navigate = useNavigate();

  const createProject = () => {
    navigate("/projects/new");
  };

  return (
    <>
      <h1>Microlab Projects</h1>
      <div className="new-project-buttons">
        <button onClick={() => createProject()}>Create New Project</button>{" "}
        <div className="import-project-container">
          <label htmlFor="import-file">Import Project:</label>{" "}
          <input
            type="file"
            id="myFile"
            name="import-file"
            onChange={(e) => {
              const fileReader = new FileReader();
              const file = e?.target?.files?.item(0);

              fileReader.addEventListener("load", () => {
                const importObject = fileReader.result
                  ? JSON.parse(fileReader.result as string)
                  : null;
                if (importObject) {
                  importProject(importObject);
                }
              });
              if (file) {
                fileReader.readAsText(file);
              }
            }}
          />
        </div>
      </div>
      <ul className="projects-list">
        {projects &&
          Object.keys(projects).map((key) => {
            return (
              <li key={key}>
                <Link to={`/projects/${key}`}>{projects[key].name}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
