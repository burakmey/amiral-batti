import { useState, useEffect, memo } from "react";
import { useMainContext } from "../../context/MainContext";
import Menu from "../Menu/Menu";
import "./SelectPlayers.css";

const labelName = ["Player", "Computer"];

function Player(props) {
  console.log("Player rendered!");

  const [inputClassName, setInputClassName] = useState("name-input");
  const [nameClassName, setnameClassName] = useState("player-name");
  const [isPlayer, setIsPlayer] = useState(false);
  const { gamers } = useMainContext();

  useEffect(() => {
    return () => console.log("Player unmounted!");
  }, []);

  const arrowUpClick = () => {
    setIsPlayer(false);
    gamers.current[props.id].isPlayer = false;
  };

  const arrowDownClick = () => {
    setIsPlayer(true);
    gamers.current[props.id].isPlayer = true;
  };

  const updateStyle = (onFocus) => {
    if (onFocus || gamers.current[props.id].name.length !== 0) {
      setInputClassName("name-input name-input-animated");
      setnameClassName("player-name player-name-animated");
    } else {
      setInputClassName("name-input");
      setnameClassName("player-name");
    }
  };

  const getInput = (event) => {
    gamers.current[props.id].name = event.target.value;
  };

  return (
    <div className="player">
      <Menu
        arrowClassName={"arrow-secondary"}
        arrowUpClick={arrowUpClick}
        arrowDownClick={arrowDownClick}
      >
        <div>
          <input
            className={inputClassName}
            onChange={getInput}
            onFocus={() => updateStyle(true)}
            onBlur={() => updateStyle(false)}
            maxLength={20}
          />
          <span className={nameClassName}>
            {isPlayer ? labelName[0] : labelName[1]}
          </span>
        </div>
      </Menu>
    </div>
  );
}

export default memo(Player);
