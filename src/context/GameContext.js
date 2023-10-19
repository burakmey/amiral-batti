import { createContext, useContext, useRef } from "react";
import { useMainContext } from "./MainContext";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const { gamers, boards } = useMainContext();

  const cellRefs = useRef([[], []]);
  let turn = 0;

  const getTurn = () => {
    return turn;
  };
  const updateTurn = () => {
    turn = turn === 0 ? 1 : 0;
  };

  let values = {
    cellRefs,
    getTurn,
    updateTurn,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
