import React, { useEffect, useState, useRef } from "react";
import Cell from "./Cell";
import "./Board.css";
import "../../styles.css";

function Board() {
  //Placing BOARD!
  console.log("Board rendered!");

  const cellRefs = useRef([]);
  const fleets = [2, 3, 3, 4, 5];
  const [fleet, setFleet] = useState(fleets[4]);
  const [rotate, setRotate] = useState(true); //true = horizontal, false = vertical;

  const onClick = (cellKey) => {
    console.log(cellKey);
  };

  const onMouseEnter = (cellKey) => {
    if (rotate) {
      cellKey = setHorizontalPlacement(cellKey);
    } else {
      cellKey = setVerticalPlacement(cellKey);
    }
    for (let i = 0; i < fleet; i++) {
      cellRefs.current[cellKey + i].setShip();
    }
  };

  const onMouseLeave = (cellKey) => {
    if (rotate) {
      cellKey = setHorizontalPlacement(cellKey);
    } else {
      cellKey = setVerticalPlacement(cellKey);
    }
    for (let i = 0; i < fleet; i++) {
      cellRefs.current[cellKey + i].setWave();
    }
  };

  const setHorizontalPlacement = (cellKey) => {
    const x = cellKey % 10;
    const y = cellKey - x;
    if (x + fleet - 1 > 9) {
      cellKey = y + 10 - fleet;
      console.log(cellKey);
    }
    return cellKey;
  };

  const setVerticalPlacement = (cellKey) => {
    const x = cellKey % 10;
    const y = cellKey - x;
    return cellKey;
  };

  return (
    <div className="board">
      {Array(100)
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

export default Board;
