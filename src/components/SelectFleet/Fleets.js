import React from "react";
import SelectFleet from "./SelectFleet";
import "./SelectFleet.css";
import "../../styles.css";

function Fleets() {
  console.log("SelectFleet rendered!");
  return (
    <div className="fleets">
      <SelectFleet shipCount={5} />
      <SelectFleet shipCount={4} />
      <SelectFleet shipCount={3} />
      <SelectFleet shipCount={3} />
      <SelectFleet shipCount={2} />
    </div>
  );
}

export default Fleets;
