import { createContext, useRef, useContext } from "react";

const PlaceShipContext = createContext();

export const PlaceShipProvider = ({ children }) => {
  const fleetRef = useRef(5);
  const isHorizontalRef = useRef(true);
  const values = { fleetRef, isHorizontalRef };
  return (
    <PlaceShipContext.Provider value={values}>
      {children}
    </PlaceShipContext.Provider>
  );
};

export const usePlaceShipContext = () => useContext(PlaceShipContext);
