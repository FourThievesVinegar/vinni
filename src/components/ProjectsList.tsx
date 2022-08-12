import { Link, useNavigate } from "react-router-dom";
import * as Accordion from "@radix-ui/react-accordion";

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

      <ul className="projects-list">
        {projects &&
          Object.keys(projects).map((key) => {
            return (
              <li className="title-font projects-list-project" key={key}>
                <Link to={`/projects/${key}`}>{projects[key].name}</Link>
              </li>
            );
          })}
      </ul>
      <div className="projects-list-controls">
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
        <Accordion.Root type="multiple" className="projects-list-accordion">
          <Accordion.Item value="notes">
            <Accordion.Header>
              <Accordion.Trigger>
                <h2>Test Projects</h2>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <div className="test-projects">
                <a
                  target="_blank"
                  href="https://files.fourthievesvinegar.org/microlab/Microlab-Test-Project.4tv"
                  rel="noreferrer"
                  download
                >
                  Microlab Test Project
                </a>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
};
