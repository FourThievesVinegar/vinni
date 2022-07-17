import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useCompoundsContext } from "../../contexts/CompoundsContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";

interface ProjectReactionsProps {
  projectCompounds: string[];
  projectReactions: string[];
  projectId: string;
}

export const ProjectReactions = ({
  projectCompounds,
  projectReactions,
  projectId,
}: ProjectReactionsProps) => {
  const [newReactionName, setNewReactionName] = useState("");
  const [newReactionInputs, setNewReactionInputs] = useState<string[]>([]);
  const [newReactionOutputs, setNewReactionOutputs] = useState<string[]>([]);

  const { compounds, reactions, createReaction } = useCompoundsContext();
  const { addReactionToProject } = useProjectsContext();

  const handleCreateReaction = (name: string, inputs: any, outputs: any) => {
    if (name.length === 0 || inputs.length === 0 || outputs.length === 0)
      return;
    const reactionId = createReaction(name, inputs, outputs);
    addReactionToProject(reactionId, projectId);
    setNewReactionName("");
    setNewReactionInputs([]);
    setNewReactionOutputs([]);
  };

  return (
    <div className="project-reactions">
      <h4>Reactions</h4>

      <ul className="projects-reactions-list">
        {projectReactions.map((reactionId) => {
          const reaction = reactions[reactionId];
          if (!reaction) return null;
          return (
            <li key={reaction.name}>
              <Accordion.Root
                type="multiple"
                className="project-reaction-accordion"
              >
                <Accordion.Item value="notes">
                  <Accordion.Trigger>
                    {reaction.name} - {reaction.inputs.length} {"->"}{" "}
                    {reaction.outputs.length}
                  </Accordion.Trigger>
                  <Accordion.Content className="reaction-accordion-content">
                    <div>
                      <h5>Inputs</h5>
                      <ul>
                        {reaction.inputs.map((compoundId: string) => (
                          <li key={compoundId}>{compounds[compoundId].name}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5>Outputs</h5>
                      <ul>
                        {reaction.outputs.map((compoundId: string) => (
                          <li key={compoundId}>{compounds[compoundId].name}</li>
                        ))}
                      </ul>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </li>
          );
        })}
      </ul>
      {projectReactions.length === 0 && (
        <p>No reactions yet. You can find some in Chemhacktica</p>
      )}
      <div className="new-reaction-form">
        <div className="new-reaction-input-output-selection">
          <div className="reaction-inputs-list-container">
            <p>Inputs</p>
            <ul className="reaction-inputs-list">
              {projectCompounds.map((compoundId: string) => {
                const compoundData = compounds[compoundId];
                return (
                  <li key={compoundData.smilesString}>
                    <input
                      type="checkbox"
                      checked={newReactionInputs.includes(compoundId)}
                      onChange={(e) => {
                        let newNewReactionInputs = [...newReactionInputs];
                        if (e.target.checked) {
                          newNewReactionInputs.push(compoundId);
                        } else {
                          let valueIndex =
                            newNewReactionInputs.indexOf(compoundId);
                          newNewReactionInputs.splice(valueIndex, 1);
                        }
                        setNewReactionInputs(newNewReactionInputs);
                      }}
                    />
                    {compoundData.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="reaction-outputs-list-container">
            <p>Outputs</p>
            <ul className="reaction-outputs-list">
              {projectCompounds.map((compoundId: string) => {
                const compoundData = compounds[compoundId];
                return (
                  <li key={compoundData.smilesString}>
                    <input
                      type="checkbox"
                      checked={newReactionOutputs.includes(compoundId)}
                      onChange={(e) => {
                        let newNewReactionOutputs = [...newReactionOutputs];
                        if (e.target.checked) {
                          newNewReactionOutputs.push(compoundId);
                        } else {
                          let valueIndex =
                            newNewReactionOutputs.indexOf(compoundId);
                          newNewReactionOutputs.splice(valueIndex, 1);
                        }
                        setNewReactionOutputs(newNewReactionOutputs);
                      }}
                    />
                    {compoundData.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="new-reaction-name-selection">
          <input
            value={newReactionName}
            placeholder={"New reaction name"}
            onChange={(e) => {
              setNewReactionName(e.target.value);
            }}
          />

          <button
            onClick={(e) => {
              handleCreateReaction(
                newReactionName,
                newReactionInputs,
                newReactionOutputs
              );
            }}
          >
            Add Reaction
          </button>
        </div>
      </div>
    </div>
  );
};
