import { createContext, useRef, useContext } from "react";

const PlaceShipContext = createContext();

export const PlaceShipProvider = ({ children }) => {
  const cellRefs = useRef([]);
  const selectFleetRef = useRef([]);
  let currentFleet = { location: [], shipCount: -1, id: -1 };
  let placedFleets = [];
  let unavailableLocations = [];

  const values = {
    cellRefs,
    selectFleetRef,
    placedFleets,
    currentFleet,
    unavailableLocations,
  };
  return (
    <PlaceShipContext.Provider value={values}>
      {children}
    </PlaceShipContext.Provider>
  );
};

export const usePlaceShipContext = () => useContext(PlaceShipContext);
