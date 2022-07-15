import { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface CompoundsContextType {
  browsingChemhacktica: boolean;
  closeChemhackticaDialog: () => void;
  createCompound: (name: string, smilesString: string) => string;
  compounds?: any;
  openChemhackticaDialog: () => void;
}

export interface CompoundType {
  text: string;
}

export const CHEMHACKTICA_URL = "https://synth.fourthievesvinegar.org/";

const CompoundsContext = createContext<CompoundsContextType>({
  browsingChemhacktica: false,
  closeChemhackticaDialog: () => {},
  createCompound: (name: string, smilesString: string) => "",
  compounds: {},
  openChemhackticaDialog: () => {},
});

export const useCompoundsContext = () => {
  const context = useContext(CompoundsContext);

  if (!context) {
    console.log("ERROR! CompoundsContext used outside its provider");
  }

  return context;
};

const saveCompounds = (compounds: { string: CompoundType }) => {
  localStorage.setItem("vinni-compounds", JSON.stringify(compounds));
};

const loadCompounds = () => {
  return JSON.parse(localStorage.getItem("vinni-compounds") || "{}");
};

export const CompoundsProvider = ({ children }: any) => {
  const [compounds, setCompounds] = useState<any>({});
  const [browsingChemhacktica, setBrowsingChemhacktica] =
    useState<boolean>(false);

  useEffect(() => {
    setCompounds(loadCompounds());
  }, []);

  useEffect(() => {
    saveCompounds(compounds);
  }, [compounds]);

  const createCompound = (name: string, smilesString: string) => {
    const compoundId = nanoid(12);
    const newCompounds = {
      ...compounds,
      [compoundId]: { name, smilesString },
    };
    setCompounds(newCompounds);
    return compoundId;
  };

  const openChemhackticaDialog = () => {
    setBrowsingChemhacktica(true);
  };

  const closeChemhackticaDialog = () => {
    setBrowsingChemhacktica(false);
  };

  return (
    <CompoundsContext.Provider
      value={{
        browsingChemhacktica,
        closeChemhackticaDialog,
        compounds,
        createCompound,
        openChemhackticaDialog,
      }}
    >
      {children}
    </CompoundsContext.Provider>
  );
};
