import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useCompoundsContext } from "../../contexts/CompoundsContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";

interface ProjectResearchProps {
  projectCompounds: string[];
  projectId: string;
}

export const ProjectResearch = ({
  projectCompounds,
  projectId,
}: ProjectResearchProps) => {
  const { addCompoundToProject } = useProjectsContext();
  const { compounds, openChemhackticaDialog } = useCompoundsContext();

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
            <button
              onClick={(e) => {
                openChemhackticaDialog();
              }}
            >
              Open Chemhacktica
            </button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};
