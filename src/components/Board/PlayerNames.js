import { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";

function PlayerNames() {
  console.log("PlayerNames rendered!");

  const { gamers } = useMainContext();

  useEffect(() => {
    return () => console.log("PlayerNames unmounted!");
  }, []);

  return (
    <div className="player-names">
      <div>{gamers.current[0].name}'s Board</div>
      <div>VS</div>
      <div>{gamers.current[1].name}'s Board</div>
    </div>
  );
}

export default PlayerNames;
