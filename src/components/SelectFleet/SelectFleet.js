import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import { RiShipLine } from "react-icons/ri";
import Button from "../Button/Button";
import "./SelectFleet.css";

const MAX_ROW = 15;
const MAX_COLUMN = 12;

function SelectFleet(props, ref) {
  console.log("SelectFleet rendered!");

  const [buildSize, setBuildSize] = useState(0);
  const { cellRefs, placedFleets, currentFleet, unavailableLocations } =
    usePlaceShipContext();
  let unavailableCurrent = [];

  useImperativeHandle(ref, () => ({
    buildCompleted: buildCompleted,
    updateBuildSize: updateBuildSize,
  }));

  const buildCompleted = () => {
    let clone = { location: currentFleet.location, id: currentFleet.id };
    placedFleets.push(clone);
    currentFleet.location.forEach((element) => {
      addToUnavailableLocations(element);
    });
    unavailableCurrent.forEach((element) => {
      cellRefs.current[element].setUnavailable();
    });
    unavailableLocations.push({
      location: unavailableCurrent,
      id: currentFleet.id,
    });

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

  const addToUnavailableLocations = (cellKey) => {
    let iStart = cellKey - MAX_COLUMN < 0 ? 0 : -1;
    let iStop = cellKey + MAX_COLUMN > MAX_COLUMN * MAX_ROW ? 0 : 1;
    let jStart = (cellKey % MAX_COLUMN) - 1 < 0 ? 0 : -1;
    let jStop = (cellKey % MAX_COLUMN) + 1 < MAX_COLUMN ? 1 : 0;

    for (let i = iStart; i <= iStop; i++)
      for (let j = jStart; j <= jStop; j++) {
        let location = cellKey + i * MAX_COLUMN + j;
        if (
          !unavailableCurrent.includes(location) &&
          !currentFleet.location.includes(location)
        )
          unavailableCurrent.push(location);
      }
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
