import { useEffect, useState } from "react";
import Player from "./Player";
import Button from "../Button/Button";

//const mainButtonName = "Set Players";
const subButtonName = "Start";

function SelectPlayers(props) {
  console.log("SelectPlayers rendered!");

  const [buttonName, setButtonName] = useState("Set Players");
  const [buttonClassName, setButtonClassName] = useState("main-button");

  useEffect(() => {
    return () => console.log("SelectPlayers unmounted!");
  }, []);

  const onClick = (buttonName) => {
    switch (buttonName) {
      case "Set Players":
        setButtonClassName("sub-button");
        setButtonName(subButtonName);
        break;
      case "Start":
        props.setPage("MainMenu");
        break;
      default:
        break;
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
