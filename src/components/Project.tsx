import { useParams, useNavigate, Link } from "react-router-dom";
import { useProjectsContext } from "../contexts/ProjectsContext";
import { ProjectNotes } from "./Projects/ProjectNotes";
import { ProjectRecipes } from "./Projects/ProjectRecipes";
import { ProjectResearch } from "./Projects/ProjectResearch";

export const Project = () => {
  const { projectId } = useParams();
  const { projects, exportProject } = useProjectsContext();
  let navigate = useNavigate();

  if (!projectId) {
    navigate("/projects");
    return null;
  }

  const project = projects[projectId];

  if (!project) {
    return null;
  }

  return (
    <>
      <header className="project-header">
        <h1>
          <Link to="/projects">{"<"}</Link> Project: {project.name || projectId}
        </h1>
        <button onClick={(e) => exportProject(projectId)}>Export</button>
      </header>
      {project && (
        <>
          <ProjectResearch
            projectCompounds={project["compounds"]}
            projectId={projectId}
            projectReactions={project["reactions"]}
          />
          <ProjectRecipes
            projectRecipes={project["recipes"]}
            projectId={projectId}
          />
          <ProjectNotes projectNotes={project["notes"]} projectId={projectId} />
        </>
      )}
    </>
  );
};
