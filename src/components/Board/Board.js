import React, { useEffect, useState, useRef } from "react";
import Cell from "./Cell";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import "./Board.css";
import "../../styles.css";

function Board() {
  //Placing BOARD!
  console.log("Board rendered!");

  const cellRefs = useRef([]);
  let fleetOnMouse = new Array();
  let placedFleets = new Array();
  let unsuitableLocations = new Array();
  const { fleetRef, isHorizontalRef } = usePlaceShipContext(); // true = horizontal, false = vertical;
  let allowMouseEnter = true;

  useState(() => {});

  const onClick = () => {
    if (isHorizontalRef.current) {
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
    if (isHorizontalRef.current) {
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
      if (isHorizontalRef.current) {
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
    if (isHorizontalRef.current) {
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
    if (x + fleetRef.current - 1 > 9) {
      cellKey = y + 10 - fleetRef.current;
    }
    let location = new Array();
    for (let i = 0; i < fleetRef.current; i++) {
      location.push(cellKey + i);
    }
  };

  const setVerticalPlacement = (cellKey) => {
    fleetOnMouse = new Array();
    const x = cellKey % 10;
    if (cellKey + (fleetRef.current - 1) * 10 > 99) {
      cellKey = x + (10 - fleetRef.current) * 10;
    }
    for (let i = 0; i < fleetRef.current; i++) {
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
