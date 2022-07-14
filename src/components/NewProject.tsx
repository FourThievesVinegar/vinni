import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectsContext } from "../contexts/ProjectsContext";

export const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const { createProject } = useProjectsContext();
  let navigate = useNavigate();

  return (
    <section>
      <h1>Create a Project</h1>
      <label htmlFor="projectName">Name</label>{" "}
      <input
        onChange={(e) => {
          setProjectName(e.target.value);
        }}
        name="projectName"
      />
      <button
        disabled={projectName.length <= 0}
        onClick={() => {
          const creationMessage = createProject(projectName);
          if (!creationMessage) {
            navigate(`/projects/${projectName}`);
          }
          setMessage(creationMessage);
        }}
      >
        Create
      </button>
      {message && <p>{message}</p>}
    </section>
  );
};
