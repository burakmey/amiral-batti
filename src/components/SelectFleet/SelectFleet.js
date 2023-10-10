import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import { RiShipLine } from "react-icons/ri";
import Button from "../Button/Button";
import "./SelectFleet.css";

const MAX_ROW = 10;
const MAX_COLUMN = 10;

function SelectFleet(props, ref) {
  console.log("SelectFleet rendered!");

  const [isClickable, setIsClickable] = useState(true);
  const [buildSize, setBuildSize] = useState(0);
  const [buttonType, setButtonType] = useState(0);
  const [className, setClassName] = useState("select-fleet");
  const {
    cellRefs,
    placedFleets,
    currentFleet,
    unavailableLocations,
    selectFleetRef,
  } = usePlaceShipContext();
  let unavailableCurrent = [];

  useImperativeHandle(ref, () => ({
    buildCompleted: buildCompleted,
    updateBuildSize: updateBuildSize,
    updateClassName: updateClassName,
    updateButtonType: updateButtonType,
    updateClickable: updateClickable,
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

    setButtonType(2);
    updateClassName("select-fleet placed-fleet");
    for (let i = 0; i < selectFleetRef.current.length; i++)
      selectFleetRef.current[i].updateClickable(true);
    currentFleet.location = [];
    currentFleet.shipCount = -1;
    currentFleet.id = -1;
  };

  const updateBuildSize = () => {
    if (buildSize === 0) {
      setButtonType(1);
      for (let i = 0; i < selectFleetRef.current.length; i++)
        if (i !== currentFleet.id)
          selectFleetRef.current[i].updateClickable(false);
    }
    setBuildSize((previousState) => previousState + 1);
  };

  const updateClassName = (className) => {
    setClassName(className);
  };

  const updateButtonType = (type) => {
    setButtonType(type);
  };

  const updateClickable = (bool) => {
    setIsClickable(bool);
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
          selectFleetRef.current[currentFleet.id]?.updateClassName(
            "select-fleet"
          );
          setClassName("select-fleet active-fleet");
          currentFleet.location = [];
          currentFleet.shipCount = props.shipCount;
          currentFleet.id = props.id;
          break;
        case "Clear":
          console.log("clear");
          break;
        case "Undo":
          console.log("undo");
          break;
        case "Rebuild":
          placedFleets.some((object) => {
            if (object.id === props.id) {
              console.log(object.location);
              object.location.forEach((element) =>
                cellRefs.current[element].setUnHit()
              );
              const index = placedFleets.indexOf(object);
              placedFleets.splice(index, 1);
            }
          });
          unavailableLocations.some((object) => {
            if (object.id === props.id) {
              console.log(object.location);
              object.location.forEach((element) => {
                if (
                  !unavailableLocations.some(
                    (object) =>
                      object.location.includes(element) &&
                      object.id !== props.id
                  )
                )
                  cellRefs.current[element].setUnHit();
              });
              const index = unavailableLocations.indexOf(object);
              unavailableLocations.splice(index, 1);
            }
          });
          setBuildSize(0);
          setClassName("select-fleet active-fleet");
          updateButtonType(0);
          selectFleetRef.current[currentFleet.id]?.updateClassName(
            "select-fleet"
          );
          currentFleet.location = [];
          currentFleet.shipCount = props.shipCount;
          currentFleet.id = props.id;
          break;
        default:
          break;
      }
    },
    [selectFleetRef, currentFleet, props]
  );

  const ships = (
    <div className="fleet">
      {Array(props.shipCount)
        .fill()
        .map((_, key) => (
          <RiShipLine
            key={key}
            className={key + 1 <= buildSize ? "placed-ship" : "unplaced-ship"}
          />
        ))}
    </div>
  );

  const getButtons = (key) => {
    switch (key) {
      case 0:
        return (
          <div className="buttons">
            <Button
              name={"Select"}
              className={"small-button"}
              onClick={
                isClickable ? onClick : () => console.log("Select-unavailable")
              }
            />
          </div>
        );
      case 1:
        return (
          <div className="buttons">
            <Button
              name={"Undo"}
              className={"small-button"}
              onClick={onClick}
            />
            <Button
              name={"Clear"}
              className={"small-button"}
              onClick={onClick}
            />
          </div>
        );
      case 2:
        return (
          <div className="buttons">
            <Button
              name={"Rebuild"}
              className={"small-button"}
              onClick={
                isClickable ? onClick : () => console.log("Rebuild-unavailable")
              }
            />
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className={`${className} ${isClickable ? "" : "unavailable-fleet"}`}>
      {ships}
      {getButtons(buttonType)}
    </div>
  );
}

export default forwardRef(SelectFleet);
