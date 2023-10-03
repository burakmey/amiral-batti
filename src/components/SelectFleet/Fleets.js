import React from "react";
import SelectFleet from "./SelectFleet";
import "./SelectFleet.css";
import { usePlaceShipContext } from "../../context/PlaceShipContext";

function Fleets() {
  console.log("Fleets rendered!");

  const { selectFleetRef } = usePlaceShipContext();

  return (
    <div className="fleets">
      <SelectFleet
        ref={(ref) => (selectFleetRef.current[0] = ref)}
        shipCount={5}
        id={0}
      />
      <SelectFleet
        ref={(ref) => (selectFleetRef.current[1] = ref)}
        shipCount={4}
        id={1}
      />
      <SelectFleet
        ref={(ref) => (selectFleetRef.current[2] = ref)}
        shipCount={3}
        id={2}
      />
      <SelectFleet
        ref={(ref) => (selectFleetRef.current[3] = ref)}
        shipCount={3}
        id={3}
      />
      <SelectFleet
        ref={(ref) => (selectFleetRef.current[4] = ref)}
        shipCount={2}
        id={4}
      />
    </div>
  );
}

export default Fleets;
