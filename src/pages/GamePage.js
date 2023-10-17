import { useEffect } from "react";
import { GameProvider } from "../context/GameContext";
import PlayerNames from "../components/Board/PlayerNames";
import BoardTargeting from "../components/Board/BoardTargeting";
import "./Pages.css";

function GamePage(props) {
  console.log("GamePage rendered!");

  let turn = 0;

  useEffect(() => {
    return () => console.log("GamePage unmounted!");
  }, []);

  const getTurn = () => {
    return turn;
  };
  const updateTurn = () => {
    turn = turn === 0 ? 1 : 0;
  };

  return (
    <GameProvider>
      <div>
        <PlayerNames />
        <div className="boards">
          <BoardTargeting id={0} getTurn={getTurn} updateTurn={updateTurn} />
          <BoardTargeting id={1} getTurn={getTurn} updateTurn={updateTurn} />
        </div>
      </div>
    </GameProvider>
  );
}

export default GamePage;
