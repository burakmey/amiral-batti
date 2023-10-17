import { createContext, useContext, useRef } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const cellRefs = useRef([[], []]);
  let turn = 0;

  let values = {
    cellRefs,
    turn,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
