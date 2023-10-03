import { useMemo, useRef } from "react";
import Cell from "./Cell";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import "./Board.css";

const MAX_ROW = 10;
const MAX_COLUMN = 10;

function BoardPlacement() {
  console.log("BoardPlacement rendered!");

  const {
    cellRefs,
    selectFleetRef,
    placedFleets,
    currentFleet,
    unavailableLocations,
  } = usePlaceShipContext();

  let currentCellKey = -1;
  let allowMouseEnter = true;
  let availableLocations = [];
  let isClickable = false;

  const setAvailableLocations = (cell, array, isClearCurrent) => {
    let top = cell - MAX_COLUMN < 0 ? -1 : cell - MAX_COLUMN;
    let bottom =
      cell + MAX_COLUMN > MAX_COLUMN * MAX_ROW ? -1 : cell + MAX_COLUMN;
    let left = (cell % MAX_COLUMN) - 1 < 0 ? -1 : cell - 1;
    let right = (cell % MAX_COLUMN) + 1 < MAX_COLUMN ? cell + 1 : -1;
    const locations = [top, right, bottom, left];
    locations.forEach((element) => {
      if (
        element !== -1 &&
        !array.includes(element) &&
        !currentFleet.location.includes(element) &&
        !unavailableLocations.some((object) =>
          object.location.includes(element)
        )
      )
        array.push(element);
    });
  };

  const setIsClickable = () => {
    if (
      unavailableLocations.some((object) =>
        object.location.includes(currentCellKey)
      )
    ) {
      isClickable = false;
      return;
    }
    let locations = [];
    setAvailableLocations(currentCellKey, locations, false);
    if (locations.length >= currentFleet.shipCount) {
      isClickable = true;
      //console.log(locations, 1);
      return;
    } else {
      for (let i = 0; i < locations.length; i++) {
        setAvailableLocations(locations[i], locations, false);
        if (locations.length >= currentFleet.shipCount) {
          isClickable = true;
          //console.log(locations, 2);
          return;
        }
      }
    }
    isClickable = false;
    //console.log(locations, 3);
  };

  const onClick = (cellKey) => {
    if (currentFleet.id !== -1) {
      if (isClickable) {
        setAvailableLocations(currentCellKey, availableLocations, true);
        const index = availableLocations.indexOf(currentCellKey);
        if (index !== -1) availableLocations.splice(index, 1);
        cellRefs.current[currentCellKey].setHit();
        selectFleetRef.current[currentFleet.id].updateBuildSize();
        currentFleet.location.push(currentCellKey);
      } else {
        console.log("incorrect");
        return;
      }
      if (currentFleet.shipCount === currentFleet.location.length) {
        selectFleetRef.current[currentFleet.id].buildCompleted();
        availableLocations = [];
      } else {
        for (let i = 0; i < availableLocations.length; i++)
          cellRefs.current[availableLocations[i]]?.setAvailable();
      }
    }
    allowMouseEnter = true;
  };

  const onMouseEnter = (cellKey) => {
    if (currentFleet.id !== -1 && allowMouseEnter) {
      currentCellKey = cellKey;
      if (availableLocations.length === 0) {
        setIsClickable();
        if (isClickable) {
          cellRefs.current[currentCellKey].setAvailable();
        } else {
          cellRefs.current[currentCellKey].setUnavailable();
        }
      } else if (availableLocations.includes(currentCellKey)) {
        cellRefs.current[currentCellKey].setAvailable();
        isClickable = true;
      } else {
        cellRefs.current[currentCellKey].setUnavailable();
        isClickable = false;
      }
      cellRefs.current[currentCellKey].setShip();
    }
    allowMouseEnter = false;
  };

  const onMouseLeave = (cellKey) => {
    if (currentFleet.id !== -1) {
      if (
        !availableLocations.includes(currentCellKey) &&
        !unavailableLocations.some((object) =>
          object.location.includes(currentCellKey)
        )
      ) {
        cellRefs.current[currentCellKey].setDefault();
      }
      cellRefs.current[currentCellKey].setWave();
    }
    allowMouseEnter = true;
  };

  const cells = Array(MAX_ROW * MAX_COLUMN)
    .fill()
    .map((_, index) => (
      <Cell
        ref={(ref) => (cellRefs.current[index] = ref)}
        key={index}
        id={index}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
    ));

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${MAX_COLUMN}, 1fr)`,
        gridTemplateRows: `repeat(${MAX_ROW}, 1fr)`,
      }}
    >
      {cells}
    </div>
  );
}

export default BoardPlacement;
