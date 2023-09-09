import React from "react";
import Player from "./Player";
import Button from "../Button/Button";

function SelectPlayers() {
  console.log("SelectPlayers rendered!");
  return (
    <div className="menu-players">
      <Player name={"First Player"} />
      <Button name={"Start"} className={"main-button"} />
      <Player name={"Second Player"} />
    </div>
  );
}

export default SelectPlayers;
