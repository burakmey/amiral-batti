import { useCallback, useRef, useState } from "react";
import { RiShipLine } from "react-icons/ri";
import "./SelectFleet.css";
import "../../styles.css";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import Button from "../Button/Button";

const fleetSize = getComputedStyle(document.documentElement).getPropertyValue(
  "--fleet-size"
);

function SelectFleet(props) {
  console.log("SelectFleet rendered!");

  const [className, setClassName] = useState("fleet");
  const isHorizontal = useRef(true);
  const { fleetRef, isHorizontalRef } = usePlaceShipContext();

  const onClick = useCallback(
    (buttonName) => {
      switch (buttonName) {
        case "Rotate":
          isHorizontal.current = !isHorizontal.current;
          setClassName(
            `fleet ${
              isHorizontal.current ? "fleet-horizantal" : "fleet-vertical"
            }`
          );
          break;
        case "Select":
          fleetRef.current = props.shipCount;
          isHorizontalRef.current = isHorizontal.current;
          break;
        default:
          break;
      }
    },
    [fleetRef, isHorizontalRef, props]
  );

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
