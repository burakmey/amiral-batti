import { useEffect, useRef } from "react";
import { useMainContext } from "../../context/MainContext";
import { useGameContext } from "../../context/GameContext";
import ComputerShooting from "../../AI/ComputerShooting";
import MainVariables from "../../context/MainVariables";
import Cell from "./Cell";
import "./Board.css";

const MAX_ROW = MainVariables.MAX_ROW;
const MAX_COLUMN = MainVariables.MAX_COLUMN;
const FLEETS = MainVariables.FLEETS;

function BoardTargeting(props) {
  console.log("BoardTargeting rendered!");

  const { gamers, boards } = useMainContext();
  const { cellRefs, getTurn, updateTurn } = useGameContext();
  let maxShipCount = 0;
  FLEETS.forEach((element) => (maxShipCount += element));
  const computerShooting = useRef();
  let turn = -1;
  let currentCellKey = -1;
  let allowMouseEnter = true;
  let foundShips = [];
  let cells;

  useEffect(() => {
    if (!gamers.current[props.id].isPlayer) {
      computerShooting.current = new ComputerShooting();
      if (props.id === 0) updateTurn();
    }
    return () =>
      console.log("BoardTargeting unmounted!", "???????????????????????");
  }, []);

  const onClick = (cellKey) => {
    turn = getTurn();
    if (boards.current[turn].includes(currentCellKey)) {
      foundShips.push(currentCellKey);
      cellRefs.current[turn][currentCellKey].setShip();
      cellRefs.current[turn][currentCellKey].setHit();
    } else {
      cellRefs.current[turn][currentCellKey].setHit();
      updateTurn();
    }
    if (foundShips.length === maxShipCount) {
      console.log("Game finished! The winner is :", props.id);
      console.log("Show contunie to tables");
    }
    allowMouseEnter = true;
  };

  const onMouseEnter = (cellKey) => {
    turn = getTurn();
    if (allowMouseEnter && turn === props.id) {
      currentCellKey = cellKey;
      console.log(`isShip : ${boards.current[turn].includes(currentCellKey)}`);
      cellRefs.current[turn][currentCellKey].setTarget();
    }
    allowMouseEnter = false;
  };

  const onMouseLeave = (cellKey) => {
    turn = getTurn();
    if (turn === props.id) {
      cellRefs.current[turn][currentCellKey].setWave();
    }
    allowMouseEnter = true;
  };

  if (boards.current[props.id].isPlayer) {
    cells = Array(MAX_ROW * MAX_COLUMN)
      .fill()
      .map((_, index) => (
        <Cell
          ref={(ref) => (cellRefs.current[props.id][index] = ref)}
          key={index}
          id={index}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      ));
  } else {
    cells = Array(MAX_ROW * MAX_COLUMN)
      .fill()
      .map((_, index) => (
        <Cell
          ref={(ref) => (cellRefs.current[props.id][index] = ref)}
          key={index}
          id={index}
          isHit={true}
        />
      ));
  }

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

export default BoardTargeting;
