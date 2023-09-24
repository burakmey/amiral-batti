import { useRef } from "react";
import Cell from "./Cell";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import "./Board.css";

const MAX_ROW = 15;
const MAX_COLUMN = 12;

function BoardPlacement() {
  console.log("BoardPlacement rendered!");

  const { cellRefs, selectFleetRef, placedFleets, currentFleet } =
    usePlaceShipContext();
  let currentCellKey = 0;
  let allowMouseEnter = true;

  const onClick = (cellKey) => {
    if (currentFleet.id !== -1) {
      cellRefs.current[currentCellKey].setHit();
      selectFleetRef.current[currentFleet.id].updateBuildSize();
      currentFleet.location.push(currentCellKey);
      if (currentFleet.shipCount === currentFleet.location.length) {
        selectFleetRef.current[currentFleet.id].buildCompleted();
      }
    }
    allowMouseEnter = true;
  };

  const onMouseEnter = (cellKey) => {
    if (currentFleet.id !== -1 && allowMouseEnter) {
      currentCellKey = cellKey;
      cellRefs.current[currentCellKey].setShip();
    }
    allowMouseEnter = false;
  };

  const onMouseLeave = (cellKey) => {
    if (currentFleet.id !== -1) {
      cellRefs.current[currentCellKey].setWave();
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
            className={"cell-for-board"}
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
