import { createContext, useContext, useRef } from "react";

const PlaceShipContext = createContext();

export const PlaceShipProvider = ({ children }) => {
  const maxFleetCount = 5;
  const cellRefs = useRef([]);
  const selectFleetRef = useRef([]);
  let currentFleet = { location: [], shipCount: -1, id: -1 };
  let placedFleets = [];
  let unavailableLocations = [];

  const values = {
    maxFleetCount,
    cellRefs,
    selectFleetRef,
    currentFleet,
    placedFleets,
    unavailableLocations,
  };

  return (
    <PlaceShipContext.Provider value={values}>
      {children}
    </PlaceShipContext.Provider>
  );
};

export const usePlaceShipContext = () => useContext(PlaceShipContext);
