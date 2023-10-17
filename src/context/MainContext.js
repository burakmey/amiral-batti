import { createContext, useContext, useRef } from "react";
import ComputerPlacement from "../AI/ComputerPlacement";
import MainVariables from "../context/MainVariables";

const FLEETS = MainVariables.FLEETS;

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const gamers = useRef([
    { name: "aa", isPlayer: false, isPlacementFinished: false, id: 0 },
    { name: "bb", isPlayer: false, isPlacementFinished: false, id: 1 },
  ]);
  let boards = useRef([[], []]);

  const getCurrentGamer = () => {
    let currentGamer = -1;
    for (let i = 0; i < gamers.current.length; i++) {
      if (gamers.current[i].isPlayer && !gamers.current[i].isPlacementFinished)
        return i;
    }
    return currentGamer;
  };

  const updateBoard = (location, index) => {
    console.log(location);
    location.forEach((array) => {
      array.forEach((element) => {
        boards.current[index].push(element);
      });
    });
  };

  const createComputerBoard = (index) => {
    const cp = new ComputerPlacement();
    for (let i = 0; i < FLEETS.length; i++) cp.placeShip();
    updateBoard(cp.placedFleets, index);
  };

  const values = {
    gamers,
    boards,
    getCurrentGamer,
    updateBoard,
    createComputerBoard,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);
