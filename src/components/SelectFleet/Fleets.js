import React from "react";
import SelectFleet from "./SelectFleet";
import "./SelectFleet.css";
import { usePlaceShipContext } from "../../context/PlaceShipContext";

function Fleets() {
  console.log("SelectFleet rendered!");

  const { selectFleetRef } = usePlaceShipContext();

  return (
    <div className="fleets">
      <SelectFleet
        ref={(el) => selectFleetRef.current.push(el)}
        shipCount={5}
        id={0}
      />
      <SelectFleet
        ref={(el) => selectFleetRef.current.push(el)}
        shipCount={4}
        id={1}
      />
      <SelectFleet
        ref={(el) => selectFleetRef.current.push(el)}
        shipCount={3}
        id={2}
      />
      <SelectFleet
        ref={(el) => selectFleetRef.current.push(el)}
        shipCount={3}
        id={3}
      />
      <SelectFleet
        ref={(el) => selectFleetRef.current.push(el)}
        shipCount={2}
        id={4}
      />
    </div>
  );
}

export default Fleets;
