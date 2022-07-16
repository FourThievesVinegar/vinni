import { useParams, useNavigate, Link } from "react-router-dom";
import { useProjectsContext } from "../contexts/ProjectsContext";
import { ProjectNotes } from "./Projects/ProjectNotes";
import { ProjectRecipes } from "./Projects/ProjectRecipes";
import { ProjectResearch } from "./Projects/ProjectResearch";

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
      <header className="project-header">
        <h1>
          <Link to="/projects">{"<"}</Link> Project: {projectId}
        </h1>
        <button>Export</button>
      </header>
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
