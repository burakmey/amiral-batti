import { useEffect } from "react";
import { GameProvider } from "../context/GameContext";
//import { useMainContext } from "../context/MainContext";
import PlayerNames from "../components/Board/PlayerNames";
import BoardTargeting from "../components/Board/BoardTargeting";
import "./Pages.css";

function GamePage(props) {
  console.log("GamePage rendered!");

  //const { gamers } = useMainContext();

  useEffect(() => {
    return () => console.log("GamePage unmounted!");
  }, []);

  return (
    <GameProvider>
      <div>
        <PlayerNames />
        <div className="boards">
          <BoardTargeting id={0} />
          <BoardTargeting id={1} />
        </div>
      </div>
    </GameProvider>
  );
}

export default GamePage;
