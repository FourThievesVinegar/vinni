import { useState } from "react";
import { useCompoundsContext } from "../../contexts/CompoundsContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";

interface ProjectCompoundsProps {
  projectCompounds: string[];
  projectId: string;
}

export const ProjectCompounds = ({
  projectCompounds,
  projectId,
}: ProjectCompoundsProps) => {
  const [newCompoundName, setNewCompoundName] = useState("");
  const [newCompoundSmilesString, setNewCompoundSmilesString] = useState("");

  const [compoundToAddFilterText, setCompoundToAddFilterText] = useState("");
  const [compoundToAdd, setCompoundToAdd] = useState("");

  const { compounds, createCompound } = useCompoundsContext();
  const { addCompoundToProject } = useProjectsContext();

  const handleCreateCompound = (name: string, smilesString: string) => {
    if (name.length === 0 || smilesString.length === 0) return;
    const compoundId = createCompound(name, smilesString);
    addCompoundToProject(compoundId, projectId);
    setNewCompoundName("");
    setNewCompoundSmilesString("");
  };

  const handleAddCompound = (compoundId: string) => {
    if (!compoundId) return;
    addCompoundToProject(compoundId, projectId);
  };

  const nonProjectCompoundIds = Object.keys(compounds).filter(
    (compoundId) =>
      !projectCompounds.includes(compoundId) &&
      compounds[compoundId].name.includes(compoundToAddFilterText)
  );

  return (
    <div className="project-compounds">
      <h4>Compounds</h4>
      <ul>
        {projectCompounds.map((compoundId) => {
          const compound = compounds[compoundId];
          return (
            <li key={compound.smilesString}>
              {compound.name} - {compound.smilesString}
            </li>
          );
        })}
      </ul>
      {projectCompounds.length === 0 && (
        <p>No compounds yet. You can find some in Chemhacktica</p>
      )}
      <div className="compound-forms-wrapper">
        <div className="new-compound-form">
          <input
            value={newCompoundName}
            placeholder={"New compound name"}
            onChange={(e) => {
              setNewCompoundName(e.target.value);
            }}
          />
          <input
            value={newCompoundSmilesString}
            placeholder={"New compound SMILES"}
            onChange={(e) => {
              setNewCompoundSmilesString(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              handleCreateCompound(newCompoundName, newCompoundSmilesString);
            }}
          >
            Create Compound
          </button>
        </div>
        {(nonProjectCompoundIds.length || compoundToAddFilterText) && (
          <div className="add-compound-form">
            <input
              placeholder="Filter Compounds"
              value={compoundToAddFilterText}
              onChange={(e) => {
                setCompoundToAddFilterText(e.target.value);
              }}
            />
            <select
              onChange={(e) => {
                setCompoundToAdd(e.target.value);
              }}
            >
              {nonProjectCompoundIds.map((compoundId) => {
                return (
                  <option value={compoundId}>
                    {compounds[compoundId].name}
                  </option>
                );
              })}
            </select>
            <button
              onClick={(e) => {
                handleAddCompound(compoundToAdd);
              }}
            >
              Add to Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
