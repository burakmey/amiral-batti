import { useState, useRef, memo, useEffect } from "react";
import Menu from "../Menu/Menu";
import "./SelectPlayers.css";
import "../../styles.css";

const labelName = ["Player", "Computer"];

function Player(props) {
  console.log("Player rendered!");

  const inputRef = useRef("");
  const [inputClassName, setInputClassName] = useState("name-input");
  const [nameClassName, setnameClassName] = useState("player-name");
  const [isPlayer, setIsPlayer] = useState(true);

  useEffect(() => {
    return () => console.log("Player unmounted!");
  }, []);

  const arrowUpClick = () => {
    setIsPlayer(false);
  };

  const arrowDownClick = () => {
    setIsPlayer(true);
  };

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
