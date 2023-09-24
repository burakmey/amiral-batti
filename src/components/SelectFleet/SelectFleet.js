import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import { RiShipLine } from "react-icons/ri";
import Button from "../Button/Button";
import "./SelectFleet.css";

function SelectFleet(props, ref) {
  console.log("SelectFleet rendered!");

  const [buildSize, setBuildSize] = useState(0);
  const { placedFleets, currentFleet } = usePlaceShipContext();

  useImperativeHandle(ref, () => ({
    buildCompleted: buildCompleted,
    updateBuildSize: updateBuildSize,
  }));

  const buildCompleted = () => {
    let clone = {};
    for (let i in currentFleet) clone[i] = currentFleet[i];
    placedFleets.push(clone);
    currentFleet.location = [];
    currentFleet.shipCount = -1;
    currentFleet.id = -1;
    //console.log("inactive select button");
  };

  const updateBuildSize = () => {
    setBuildSize((prevState) => prevState + 1);
  };

  const removeBuildSize = () => {
    setBuildSize((prevState) => prevState - 1);
  };

  const clearBuildSize = () => {
    setBuildSize(0);
  };

  const onClick = useCallback(
    (buttonName) => {
      switch (buttonName) {
        case "Select":
          currentFleet.location = [];
          currentFleet.shipCount = props.shipCount;
          currentFleet.id = props.id;
          break;
        case "Clear":
          console.log("clear");
          break;
        default:
          break;
      }
    },
    [currentFleet, props]
  );

  const setBackgroundColor = (size) => {
    if (size <= buildSize)
      return { backgroundColor: "green", borderRadius: "5px" };
    else return { backgroundColor: "red", borderRadius: "5px" };
  };

  return (
    <div className="select-fleet">
      <div className="fleet">
        {Array(props.shipCount)
          .fill()
          .map((_, key) => (
            <RiShipLine key={key} style={setBackgroundColor(key + 1)} />
          ))}
      </div>
      <div className="buttons">
        <Button name={"Select"} className={"small-button"} onClick={onClick} />
        <Button name={"Clear"} className={"small-button"} onClick={onClick} />
      </div>
    </div>
  );
}

export default forwardRef(SelectFleet);
