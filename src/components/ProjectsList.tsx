import { Link, useNavigate } from "react-router-dom";

import { useProjectsContext } from "../contexts/ProjectsContext";

export const ProjectsList = () => {
  const { projects } = useProjectsContext();
  const navigate = useNavigate();

  const createProject = () => {
    navigate("/projects/new");
  };

  return (
    <>
      <h1>Microlab Projects</h1>
      <button onClick={() => createProject()}>Create New Project</button>
      <ul className="projects-list">
        {projects &&
          Object.keys(projects).map((key) => {
            return (
              <li key={key}>
                <Link to={`/projects/${key}`}>{key}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
