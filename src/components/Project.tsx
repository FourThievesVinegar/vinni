import { useParams, useNavigate, Link } from "react-router-dom";
import { useProjectsContext } from "../contexts/ProjectsContext";
import { ProjectNotes } from "./Project/ProjectNotes";
import { ProjectRecipes } from "./Project/ProjectRecipes";
import { ProjectResearch } from "./Project/ProjectResearch";

export const Project = () => {
  const { projectId } = useParams();
  const { projects } = useProjectsContext();
  let navigate = useNavigate();

  if (!projectId) {
    navigate("/projects");
    return null;
  }

  const project = projects[projectId];

  return (
    <>
      <h1>
        <Link to="/projects">{"<"}</Link> Project: {projectId}
      </h1>
      {projectId && JSON.stringify(project)}
      {project && (
        <>
          <ProjectNotes projectNotes={project["notes"]} projectId={projectId} />
          <ProjectResearch
            projectCompounds={project["compounds"]}
            projectId={projectId}
          />
          <ProjectRecipes
            projectRecipes={project["recipes"]}
            projectId={projectId}
          />
        </>
      )}
    </>
  );
};
