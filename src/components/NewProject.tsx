import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectsContext } from "../contexts/ProjectsContext";

export const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const { createProject } = useProjectsContext();
  let navigate = useNavigate();

  return (
    <section>
      <h1>Create a Project</h1>
      <label htmlFor="projectName">Name</label>{" "}
      <input
        autoFocus
        onChange={(e) => {
          setProjectName(e.target.value);
        }}
        name="projectName"
      />
      <button
        disabled={projectName.length <= 0}
        onClick={() => {
          const projectId = createProject(projectName);
          navigate(`/projects/${projectId}`);
        }}
      >
        Create
      </button>
    </section>
  );
};
