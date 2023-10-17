import { createContext, useContext, useRef } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const cellRefs0 = useRef([]);
  const cellRefs1 = useRef([]);

  const values = {
    cellRefs0,
    cellRefs1,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
