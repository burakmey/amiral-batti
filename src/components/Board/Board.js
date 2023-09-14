import React, { useEffect, useState, useRef } from "react";
import Cell from "./Cell";
import "./Board.css";
import "../../styles.css";

function Board() {
  //Placing BOARD!
  console.log("Board rendered!");

  const cellRefs = useRef([]);
  const indexRef = useRef(-1);
  const fleets = [2, 3, 3, 4, 5];
  const [fleet, setFleet] = useState(fleets[2]);
  const [rotate, setRotate] = useState(false); //true = horizontal, false = vertical;
  let bool = true;

  const onClick = (cellKey) => {
    console.log(cellKey);
  };

  const onMouseEnter = (cellKey) => {
    if (bool) {
      if (rotate) {
        indexRef.current = setHorizontalPlacement(cellKey);
        for (let i = 0; i < fleet; i++) {
          cellRefs.current[indexRef.current + i].setShip();
        }
      } else {
        indexRef.current = setVerticalPlacement(cellKey);
        for (let i = 0; i < fleet; i++) {
          cellRefs.current[indexRef.current + i * 10].setShip();
        }
      }
    }
    bool = false;
  };

  const onMouseLeave = (cellKey) => {
    if (rotate) {
      for (let i = 0; i < fleet; i++) {
        cellRefs.current[indexRef.current + i].setWave();
      }
    } else {
      for (let i = 0; i < fleet; i++) {
        cellRefs.current[indexRef.current + i * 10].setWave();
      }
    }
    bool = true;
  };

  const setHorizontalPlacement = (cellKey) => {
    const x = cellKey % 10;
    const y = cellKey - x;
    if (x + fleet - 1 > 9) {
      cellKey = y + 10 - fleet;
    }
    return cellKey;
  };

  const setVerticalPlacement = (cellKey) => {
    const x = cellKey % 10;
    const y = cellKey - x;
    if (cellKey + (fleet - 1) * 10 > 99) {
      cellKey = x + (10 - fleet) * 10;
    }
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
