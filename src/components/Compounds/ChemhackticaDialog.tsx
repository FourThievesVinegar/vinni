import * as Dialog from "@radix-ui/react-dialog";

import {
  useCompoundsContext,
  CHEMHACKTICA_URL,
} from "../../contexts/CompoundsContext";

export const ChemhackticaDialog = () => {
  const { browsingChemhacktica, closeChemhackticaDialog } =
    useCompoundsContext();

  return (
    <Dialog.Root open={browsingChemhacktica}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="dialog-header">
            <Dialog.Title>Browsing Chemhacktica</Dialog.Title>{" "}
            <Dialog.Close onClick={() => closeChemhackticaDialog()}>
              X
            </Dialog.Close>
          </div>
          <div className="dialog-body">
            <iframe
              src={CHEMHACKTICA_URL}
              title="Chemhacktica Browser"
              className="dialog-iframe"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
