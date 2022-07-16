import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import {
  useCompoundsContext,
  CHEMHACKTICA_URL,
} from "../../contexts/CompoundsContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";

import "./ProjectResearch.scss";

interface ProjectResearchProps {
  projectCompounds: string[];
  projectId: string;
}

export const ProjectResearch = ({
  projectCompounds,
  projectId,
}: ProjectResearchProps) => {
  const [newCompoundName, setNewCompoundName] = useState("");
  const [newCompoundSmilesString, setNewCompoundSmilesString] = useState("");

  const { compounds, createCompound } = useCompoundsContext();
  const { addCompoundToProject } = useProjectsContext();

  const handleCreateCompound = (name: string, smilesString: string) => {
    if (name.length === 0 || smilesString.length === 0) return;
    const compoundId = createCompound(name, smilesString);
    addCompoundToProject(compoundId, projectId);
    setNewCompoundName("");
    setNewCompoundSmilesString("");
  };

  return (
    <>
      <Accordion.Root type="multiple" className="projects-page-accordion">
        <Accordion.Item value="notes">
          <Accordion.Header>
            <Accordion.Trigger>
              <h2>Research</h2>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
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
                  handleCreateCompound(
                    newCompoundName,
                    newCompoundSmilesString
                  );
                }}
              >
                Add Compound
              </button>
            </div>
            <div>
              <button
                onClick={(e) => {
                  window.open(CHEMHACKTICA_URL);
                  // openChemhackticaDialog();
                }}
              >
                Open Chemhacktica
              </button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};
