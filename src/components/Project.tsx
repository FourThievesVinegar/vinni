import { useParams, useNavigate } from "react-router-dom";
import { useProjectsContext } from "../contexts/ProjectsContext";

export const Project = ({}) => {
  const { projectId } = useParams();
  const { projects } = useProjectsContext();
  let navigate = useNavigate();

  if (!projectId) {
    navigate("/projects");
  }

  return (
    <section>
      <h1>{projectId}</h1>
      {projectId && JSON.stringify(projects[projectId])}
    </section>
  );
};
