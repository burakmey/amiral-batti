import { useEffect, useRef } from "react";
import ComputerPlacement from "../../AI/ComputerPlacement";
import Cell from "../../components/Board/Cell";
import "../../components/Board/Board.css";

const MAX_ROW = 10;
const MAX_COLUMN = 10;

function TestBoardPlacement() {
  console.log("BoardPlacement rendered!");

  const cellRefs = useRef([]);
  const cells = Array(MAX_ROW * MAX_COLUMN)
    .fill()
    .map((_, index) => (
      <Cell
        ref={(ref) => (computerPlacement.cellRefs.current[index] = ref)}
        key={index}
        id={index}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onClick={() => {
          computerPlacement.placeShip();
        }}
      />
    ));
  const computerPlacement = new ComputerPlacement(cellRefs);

  useEffect(() => {
    return () => console.log("BoardPlacement unmounted!");
  }, []);

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

export default TestBoardPlacement;
