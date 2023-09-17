import React from "react";
import { RiShipLine } from "react-icons/ri";
import "./SelectFleet.css";
import "../../styles.css";

const fleetSize = getComputedStyle(document.documentElement).getPropertyValue(
  "--fleet-size"
);
const x = 2;

function SelectFleet(props) {
  return (
    <div className="select-fleet">
      <div
        className="fleet"
        style={{
          height: x * parseInt(fleetSize, 10),
          width: x * parseInt(fleetSize, 10),
        }}
      >
        {Array(x)
          .fill()
          .map(() => (
            <RiShipLine />
          ))}
      </div>
      <div className="rotate">Rotate</div>
    </div>
  );
}

export default SelectFleet;
