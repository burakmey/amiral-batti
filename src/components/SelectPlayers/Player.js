import { useState, useRef, memo } from "react";
import Menu from "../Menu/Menu";
import "./SelectPlayers.css";
import "../../styles.css";

function Player(props) {
  console.log("Player rendered!");

  const inputRef = useRef("");
  const [inputClassName, setInputClassName] = useState("name-input");
  const [nameClassName, setnameClassName] = useState("player-name");

  const updateStyle = (onFocus) => {
    if (onFocus || inputRef.current.length !== 0) {
      setInputClassName("name-input name-input-animated");
      setnameClassName("player-name player-name-animated");
    } else {
      setInputClassName("name-input");
      setnameClassName("player-name");
    }
  };

  const getInput = (event) => {
    inputRef.current = event.target.value;
    // console.log(inputRef);
  };
  return (
    <div className="player">
      <Menu arrowClassName={"arrow-secondary"}>
        <div>
          <input
            className={inputClassName}
            onChange={getInput}
            onFocus={() => updateStyle(true)}
            onBlur={() => updateStyle(false)}
            maxLength={20}
          />
          <span className={nameClassName}>{props.name}</span>
        </div>
      </Menu>
    </div>
  );
}

export default Player;
