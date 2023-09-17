import React, { useRef, useState } from "react";
import { RiShipLine } from "react-icons/ri";
import "./SelectFleet.css";
import "../../styles.css";
import Button from "../Button/Button";

const fleetSize = getComputedStyle(document.documentElement).getPropertyValue(
  "--fleet-size"
);

function SelectFleet(props) {
  console.log("SelectFleet rendered!");
  const [className, setClassName] = useState("fleet");
  const isHorizontal = useRef(true);

  const onClick = () => {
    console.log("onClick");
    isHorizontal.current = !isHorizontal.current;
    setClassName(
      `fleet ${isHorizontal.current ? "fleet-horizantal" : "fleet-vertical"}`
    );
  };

  return (
    <div className="select-fleet">
      <div
        className={className}
        style={{
          height: props.shipCount * parseInt(fleetSize, 10),
          width: props.shipCount * parseInt(fleetSize, 10),
        }}
      >
        {Array(props.shipCount)
          .fill()
          .map((_, key) => (
            <RiShipLine key={key} />
          ))}
      </div>
      <div className="buttons">
        <Button name={"Rotate"} className={"small-button"} onClick={onClick} />
        <Button name={"Select"} className={"small-button"} onClick={onClick} />
      </div>
    </div>
  );
}

export default SelectFleet;
