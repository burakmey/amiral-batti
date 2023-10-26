import { createContext, useContext, useRef } from "react";
import { useMainContext } from "./MainContext";
import ComputerShooting from "../AI/ComputerShooting";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const { gamers, boards } = useMainContext();

  const cellRefs = useRef([[], []]);
  const shootingForFirstRef = useRef();
  const shootingForSecondRef = useRef();
  let turn = 0;

  const getTurn = () => {
    return turn;
  };

  const updateTurn = () => {
    turn = turn === 0 ? 1 : 0;
  };

  const createComputerShooting = (opponent) => {
    if (opponent === 0)
      shootingForSecondRef.current = new ComputerShooting(
        boards.current[opponent]
      );
    else if (opponent === 1)
      shootingForFirstRef.current = new ComputerShooting(
        boards.current[opponent]
      );
  };

  let values = {
    cellRefs,
    getTurn,
    updateTurn,
    createComputerShooting,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
