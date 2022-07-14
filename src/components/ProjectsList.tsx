import { Link } from "react-router-dom";

import { useProjectsContext } from "../contexts/ProjectsContext";

export const ProjectsList = () => {
  const { projects } = useProjectsContext();

  return (
    <>
      <h1>Microlab Projects</h1>
      <Link to="/projects/new">Create New Project</Link>
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
