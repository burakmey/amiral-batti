import { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";
import { useGameContext } from "../../context/GameContext";
import PlayerNames from "./PlayerNames";
import Cell from "./Cell";
import "./Board.css";

const MAX_ROW = 10;
const MAX_COLUMN = 10;

function BoardInGame() {
  console.log("BoardInGame rendered!");

  const { gamers, boards } = useMainContext();
  const { cellRefs0, cellRefs1 } = useGameContext();

  useEffect(() => {
    return () => console.log("BoardInGame unmounted!");
  }, []);

  const onClick = () => {
    boards.current[0].forEach((element) => {
      cellRefs0.current[element].setShip();
    });
    boards.current[1].forEach((element) => {
      cellRefs1.current[element].setShip();
    });
  };
  const onMouseEnter = () => {};
  const onMouseLeave = () => {};

  const cells0 = Array(MAX_ROW * MAX_COLUMN)
    .fill()
    .map((_, index) => (
      <Cell
        ref={(ref) => (cellRefs0.current[index] = ref)}
        key={index}
        id={index}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
    ));

  const cells1 = Array(MAX_ROW * MAX_COLUMN)
    .fill()
    .map((_, index) => (
      <Cell
        ref={(ref) => (cellRefs1.current[index] = ref)}
        key={index}
        id={index}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
    ));

  return (
    <div>
      <PlayerNames />
      <div className="boards">
        <div
          className="board"
          style={{
            gridTemplateColumns: `repeat(${MAX_COLUMN}, 1fr)`,
            gridTemplateRows: `repeat(${MAX_ROW}, 1fr)`,
          }}
        >
          {cells0}
        </div>
        <div
          className="board"
          style={{
            gridTemplateColumns: `repeat(${MAX_COLUMN}, 1fr)`,
            gridTemplateRows: `repeat(${MAX_ROW}, 1fr)`,
          }}
        >
          {cells1}
        </div>
      </div>
    </div>
  );
}

export default BoardInGame;
