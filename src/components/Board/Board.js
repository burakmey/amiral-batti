import React, { useEffect, useState, useRef } from "react";
import Cell from "./Cell";
import "./Board.css";
import "../../styles.css";

function Board() {
  //Placing BOARD!
  console.log("Board rendered!");

  const cellRefs = useRef([]);
  let fleetOnMouse = new Array();
  let placedFleets = new Array();
  let unsuitableLocations = new Array();
  const fleetSizes = [2, 3, 3, 4, 5];
  const [fleet, setFleet] = useState(fleetSizes[2]);
  const [isHorizontal, setIsHorizontal] = useState(false); //true = horizontal, false = vertical;
  let allowMouseEnter = true;

  const onClick = () => {
    if (isHorizontal) {
    } else {
      if (isSuitable()) {
        addToUnsuitable();
        for (let i = 0; i < fleetOnMouse.length; i++) {
          const index = fleetOnMouse[i];
          cellRefs.current[index].setHit();
        }
      }
    }
    placedFleets.push(fleetOnMouse);
    console.log(placedFleets);
    allowMouseEnter = true;
  };

  const isSuitable = () => {
    for (let i = 0; i < fleetOnMouse.length; i++) {
      if (unsuitableLocations.includes(fleetOnMouse[i])) {
        return false;
      }
    }
    return true;
  };

  const addToUnsuitable = () => {
    let x = (fleetOnMouse[0] % 10) - 1;
    let y = fleetOnMouse[0] - 10 - 1 - x;
    if (isHorizontal) {
      //horizantal
    } else {
      let countY = 2;
      let countX = 3;
      if (y < 0) {
        y = y + 10;
        countY--;
      }
      if (x < 0) {
        x = x + 1;
        countX--;
      }
      for (
        let i = 0;
        i < fleetOnMouse.length + countY && y + i * 10 < 100;
        i++
      ) {
        for (let j = 0; j < countX && x + j < 10; j++) {
          let location = y + 10 * i + (x + j);
          if (!unsuitableLocations.includes(location))
            unsuitableLocations.push(location);
        }
      }
    }
    console.log(unsuitableLocations);
  };

  const onMouseEnter = (cellKey) => {
    if (allowMouseEnter) {
      if (isHorizontal) {
      } else {
        setVerticalPlacement(cellKey);
        for (let i = 0; i < fleetOnMouse.length; i++) {
          const index = fleetOnMouse[i];
          cellRefs.current[index].setShip();
        }
      }
    }
    allowMouseEnter = false;
  };

  const onMouseLeave = () => {
    if (isHorizontal) {
    } else {
      for (let i = 0; i < fleetOnMouse.length; i++) {
        const index = fleetOnMouse[i];
        cellRefs.current[index].setWave();
      }
    }
    allowMouseEnter = true;
  };

  const setHorizontalPlacement = (cellKey) => {
    const x = cellKey % 10;
    const y = cellKey - x;
    if (x + fleet - 1 > 9) {
      cellKey = y + 10 - fleet;
    }
    let location = new Array();
    for (let i = 0; i < fleet; i++) {
      location.push(cellKey + i);
    }
  };

  const setVerticalPlacement = (cellKey) => {
    fleetOnMouse = new Array();
    const x = cellKey % 10;
    if (cellKey + (fleet - 1) * 10 > 99) {
      cellKey = x + (10 - fleet) * 10;
    }
    for (let i = 0; i < fleet; i++) {
      const index = cellKey + i * 10;
      if (unsuitableLocations.includes(index)) {
        console.log("unsuitable");
        fleetOnMouse = new Array();
        return;
      } else {
        fleetOnMouse.push(index);
      }
    }
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
