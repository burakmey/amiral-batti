import { createContext, useContext, useRef } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const gamers = useRef([
    { name: "", isPlayer: true, isPlacementFinished: false, id: 0 },
    { name: "", isPlayer: true, isPlacementFinished: false, id: 1 },
  ]);
  const values = { gamers };
  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);
