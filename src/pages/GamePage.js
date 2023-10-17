import { useEffect } from "react";
import BoardInGame from "../components/Board/BoardInGame";
import "./Pages.css";
import { GameProvider } from "../context/GameContext";

function GamePage(props) {
  console.log("GamePage rendered!");

  useEffect(() => {
    return () => console.log("GamePage unmounted!");
  }, []);

  return (
    <GameProvider>
      <BoardInGame />
    </GameProvider>
  );
}

export default GamePage;
