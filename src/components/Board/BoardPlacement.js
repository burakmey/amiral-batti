import { useRef } from "react";
import Cell from "./Cell";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import "./Board.css";

const MAX_ROW = 15;
const MAX_COLUMN = 12;

function BoardPlacement() {
  console.log("BoardPlacement rendered!");

  const {
    cellRefs,
    selectFleetRef,
    placedFleets,
    currentFleet,
    unavailableLocations,
  } = usePlaceShipContext();
  let currentCellKey = 0;
  let allowMouseEnter = true;
  let availableLocations = [];

  const onClick = (cellKey) => {
    if (currentFleet.id !== -1) {
      if (
        availableLocations.includes(currentCellKey) ||
        availableLocations.length === 0
      ) {
        let location = currentCellKey - MAX_COLUMN;
        if (!currentFleet.location.includes(location) && location > 0)
          availableLocations.push(location);
        location = currentCellKey + 1;
        if (
          !currentFleet.location.includes(location) &&
          (currentCellKey % MAX_COLUMN) + 1 < MAX_COLUMN
        )
          availableLocations.push(location);
        location = currentCellKey + MAX_COLUMN;
        if (
          !currentFleet.location.includes(location) &&
          location < MAX_ROW * MAX_COLUMN
        )
          availableLocations.push(location);
        location = currentCellKey - 1;
        if (
          !currentFleet.location.includes(location) &&
          (currentCellKey % MAX_COLUMN) - 1 >= 0
        )
          availableLocations.push(location);

        const index = availableLocations.indexOf(currentCellKey);
        if (index !== -1) availableLocations.splice(index, 1);
        cellRefs.current[currentCellKey].setHit();
        selectFleetRef.current[currentFleet.id].updateBuildSize();
        currentFleet.location.push(currentCellKey);
      } else if (!availableLocations.includes(currentCellKey)) {
        console.log("incorrect");
        return;
      }
      for (let i = 0; i < availableLocations.length; i++)
        cellRefs.current[availableLocations[i]].setAvailable();
      if (currentFleet.shipCount === currentFleet.location.length) {
        selectFleetRef.current[currentFleet.id].buildCompleted();
      }
    }
    allowMouseEnter = true;
  };

  const onMouseEnter = (cellKey) => {
    if (currentFleet.id !== -1 && allowMouseEnter) {
      currentCellKey = cellKey;
      if (
        availableLocations.length === 0 ||
        availableLocations.includes(currentCellKey)
      )
        cellRefs.current[currentCellKey].setAvailable();
      else if (!availableLocations.includes(currentCellKey))
        cellRefs.current[currentCellKey].setUnavailable();
      cellRefs.current[currentCellKey].setShip();
    }
    allowMouseEnter = false;
  };

  const onMouseLeave = (cellKey) => {
    if (currentFleet.id !== -1) {
      cellRefs.current[currentCellKey].setWave();
      if (availableLocations.includes(currentCellKey))
        cellRefs.current[currentCellKey].setAvailable();
    }
    allowMouseEnter = true;
  };

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${MAX_COLUMN}, 1fr)`,
        gridTemplateRows: `repeat(${MAX_ROW}, 1fr)`,
      }}
    >
      {Array(MAX_ROW * MAX_COLUMN)
        .fill()
        .map((_, index) => (
          <Cell
            ref={(el) => cellRefs.current.push(el)}
            key={index}
            id={index}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          />
        ))}
    </div>
  );
}

export default BoardPlacement;
