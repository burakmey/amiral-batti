import { createContext, useContext, useRef } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const gamers = useRef([
    { name: "", isPlayer: true, isPlacementFinished: false, id: 0 },
    { name: "", isPlayer: true, isPlacementFinished: false, id: 1 },
  ]);
  const getCurrentGamer = () => {
    let currentGamer = -1;
    for (let i = 0; i < gamers.current.length; i++) {
      if (gamers.current[i].isPlayer && !gamers.current[i].isPlacementFinished)
        return i;
    }
    return currentGamer;
  };
  const values = { gamers, getCurrentGamer };
  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);
