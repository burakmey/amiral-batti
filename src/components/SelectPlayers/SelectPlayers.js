import { useState } from "react";
import Player from "./Player";
import Button from "../Button/Button";

const mainButtonName = "Set Players";
const subButtonName = "Start";

function SelectPlayers() {
  console.log("SelectPlayers rendered!");

  const [buttonName, setButtonName] = useState("Set Players");
  const [buttonClassName, setButtonClassName] = useState("main-button");
  const onClick = () => {
    if (buttonName === "Start") {
      setButtonName(mainButtonName);
      setButtonClassName("main-button");
    } else {
      setButtonClassName("sub-button");
      setButtonName(subButtonName);
    }
  };

  return (
    <div className="menu-players">
      {buttonName === subButtonName ? <Player /> : null}
      <Button name={buttonName} className={buttonClassName} onClick={onClick} />
      {buttonName === subButtonName ? <Player /> : null}
    </div>
  );
}

export default SelectPlayers;
