import * as Accordion from "@radix-ui/react-accordion";
import { ProjectCompounds } from "./ProjectCompounds";
import { ProjectReactions } from "./ProjectReactions";

import { CHEMHACKTICA_URL } from "../../contexts/CompoundsContext";

import "./ProjectResearch.scss";

interface ProjectResearchProps {
  projectCompounds: string[];
  projectId: string;
  projectReactions: string[];
}

export const ProjectResearch = ({
  projectCompounds,
  projectId,
  projectReactions,
}: ProjectResearchProps) => {
  return (
    <>
      <Accordion.Root type="multiple" className="projects-page-accordion" defaultValue={["research"]}>
        <Accordion.Item value="research">
          <Accordion.Header>
            <Accordion.Trigger>
              <h2>Research</h2>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <div className="project-research-tools">
              <button
                onClick={(e) => {
                  window.open(CHEMHACKTICA_URL);
                  // openChemhackticaDialog();
                }}
              >
                Open Chemhacktica ⧉
              </button>
            </div>
            <div className="project-research-data">
              <ProjectCompounds
                projectId={projectId}
                projectCompounds={projectCompounds}
              />
              <ProjectReactions
                projectCompounds={projectCompounds}
                projectId={projectId}
                projectReactions={projectReactions}
              />
            </div>

          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};
