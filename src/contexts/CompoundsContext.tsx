import { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface CompoundsContextType {
  addCompound: (compoundId: string, compound: any) => void;
  addCompounds: (compounds: any) => void;
  addReaction: (reactionId: string, reaction: any) => void;
  addReactions: (reactions: any) => void;
  browsingChemhacktica: boolean;
  closeChemhackticaDialog: () => void;
  createCompound: (name: string, smilesString: string) => string;
  createReaction: (name: string, inputs: any, outputs: any) => string;
  compounds?: any;
  openChemhackticaDialog: () => void;
  reactions?: any;
}

export interface CompoundType {
  text: string;
}

export const CHEMHACKTICA_URL = "https://synth.fourthievesvinegar.org/";

const CompoundsContext = createContext<CompoundsContextType>({
  addCompound: (compoundId: string, compound: any) => {},
  addCompounds: (compounds: any) => {},
  addReaction: (reactionId: string, reaction: any) => {},
  addReactions: (reactions: any) => {},
  browsingChemhacktica: false,
  closeChemhackticaDialog: () => {},
  createCompound: (name: string, smilesString: string) => "",
  createReaction: (name: string, inputs: any, outputs: any) => "",
  compounds: {},
  openChemhackticaDialog: () => {},
  reactions: {},
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

const saveReactions = (reactions: { string: any }) => {
  localStorage.setItem("vinni-reactions", JSON.stringify(reactions));
};

const loadReactions = () => {
  return JSON.parse(localStorage.getItem("vinni-reactions") || "{}");
};

export const CompoundsProvider = ({ children }: any) => {
  const [compounds, setCompounds] = useState<any>({});
  const [reactions, setReactions] = useState<any>({});
  const [browsingChemhacktica, setBrowsingChemhacktica] =
    useState<boolean>(false);

  useEffect(() => {
    setCompounds(loadCompounds());
    setReactions(loadReactions());
  }, []);

  useEffect(() => {
    saveCompounds(compounds);
  }, [compounds]);

  useEffect(() => {
    saveReactions(reactions);
  }, [reactions]);

  const createCompound = (name: string, smilesString: string) => {
    const compoundId = nanoid(12);
    const newCompounds = {
      ...compounds,
      [compoundId]: { name, smilesString },
    };
    setCompounds(newCompounds);
    return compoundId;
  };

  const createReaction = (name: string, inputs: any, outputs: any) => {
    const reactionId = nanoid(12);
    const newReactions = {
      ...reactions,
      [reactionId]: { name, inputs, outputs },
    };
    setReactions(newReactions);
    return reactionId;
  };

  const addCompound = (compoundId: string, compound: any) => {
    const newCompounds = { ...compounds, [compoundId]: compound };
    setCompounds(newCompounds);
  };

  const addCompounds = (newCompounds: any) => {
    setCompounds({ ...compounds, ...newCompounds });
  };

  const addReaction = (reactionId: string, reaction: any) => {
    const newReactions = { ...reactions, [reactionId]: reaction };
    setCompounds(newReactions);
  };

  const addReactions = (newReactions: any) => {
    setReactions({ ...reactions, ...newReactions });
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
        addCompound,
        addCompounds,
        addReaction,
        addReactions,
        browsingChemhacktica,
        closeChemhackticaDialog,
        compounds,
        createCompound,
        createReaction,
        openChemhackticaDialog,
        reactions,
      }}
    >
      {children}
    </CompoundsContext.Provider>
  );
};
