import { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";
import { useGameContext } from "../../context/GameContext";
import MainVariables from "../../context/MainVariables";
import Cell from "./Cell";
import "./Board.css";

const MAX_ROW = MainVariables.MAX_ROW;
const MAX_COLUMN = MainVariables.MAX_COLUMN;

function BoardTargeting(props) {
  console.log("BoardTargeting rendered!");

  const { gamers, boards } = useMainContext();
  const { cellRefs } = useGameContext();
  //let { turn } = useGameContext();
  let currentCellKey = -1;
  let allowMouseEnter = true;
  let isClicked = false;

  useEffect(() => {
    return () => console.log("BoardTargeting unmounted!");
  }, []);

  const onClick = (cellKey) => {
    props.updateTurn();
    allowMouseEnter = true;
  };

  const onMouseEnter = (cellKey) => {
    console.log(`props.id : ${props.id}`, `turn : ${props.getTurn()}`);
    if (allowMouseEnter && props.getTurn() === props.id) {
      currentCellKey = cellKey;
      cellRefs.current[props.getTurn()][currentCellKey]?.setTarget();
    }
    allowMouseEnter = false;
  };

  const onMouseLeave = (cellKey) => {
    if (props.getTurn() === props.id) {
      cellRefs.current[props.getTurn()][currentCellKey]?.setWave();
    }
    allowMouseEnter = true;
  };

  const cells = Array(MAX_ROW * MAX_COLUMN)
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
