import { useEffect, useState } from "react";
import { useMainContext } from "../../context/MainContext";
import Player from "./Player";
import Button from "../Button/Button";

const subButtonName = "Start";

function SelectPlayers(props) {
  console.log("SelectPlayers rendered!");

  const [buttonName, setButtonName] = useState("Set Players");
  const [buttonClassName, setButtonClassName] = useState("main-button");
  const { gamers } = useMainContext();

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
        for (let i = 0; i < gamers.current.length; i++) {
          if (
            gamers.current[i].isPlayer &&
            !gamers.current[i].isPlacementFinished
          ) {
            props.setPage("PlaceShipPage");
            return;
          }
        }
        console.log("2 computer");
        props.setPage("MainMenu");
        break;
      default:
        break;
    }
  };

  return (
    <div className="menu-players">
      {buttonName === subButtonName ? <Player id={0} /> : null}
      <Button name={buttonName} className={buttonClassName} onClick={onClick} />
      {buttonName === subButtonName ? <Player id={1} /> : null}
    </div>
  );
}

export default SelectPlayers;
