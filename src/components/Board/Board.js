import React, { useEffect, useState, useRef } from "react";
import Cell from "./Cell";
import "./Board.css";
import "../../styles.css";

function Board() {
  //Placing BOARD!
  console.log("Board rendered!");

  const cellRefs = useRef([]);

  const onClick = (cellKey) => {
    //cellRefs.current[cellKey - 1].click();
    console.log(cellKey);
  };

  const onMouseEnter = (cellKey) => {
    cellRefs.current[cellKey].iconSet();
    //console.log(cellKey);
  };

  const onMouseLeave = (cellKey) => {
    //console.log(cellKey);
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
