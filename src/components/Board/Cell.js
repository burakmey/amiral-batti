import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { RiShipLine } from "react-icons/ri";
import { LuWaves } from "react-icons/lu";
import "./Board.css";
import "../../styles.css";

function Cell(props, ref) {
  console.log("Cell rendered!");
  useImperativeHandle(ref, () => {
    return {
      setShip: () => {
        setIcon(<RiShipLine />);
        updateStyle(true);
      },
      setWave: () => {
        setIcon(<LuWaves />);
        updateStyle(false);
      },
    };
  });

  const [icon, setIcon] = useState(<LuWaves />);
  const [isHit, setIsHit] = useState(false);
  const [className, setClassName] = useState("cell");

  const updateStyle = (isOnMouse) => {
    setClassName(`cell ${isOnMouse ? "cell-on-mouse" : ""}`);
  };

  const onMouseEnter = () => {
    props.onMouseEnter(props.id);
  };

  const onMouseLeave = () => {
    props.onMouseLeave(props.id);
  };

  const onClick = () => {
    props.onClick(props.id);
    setClassName("cell cell-hit");
    setIsHit(true);
  };

  return (
    <div
      className={className}
      onMouseEnter={!isHit ? onMouseEnter : null}
      onMouseLeave={!isHit ? onMouseLeave : null}
      //onClick={!isHit ? onClick : null}
    >
      {icon}
    </div>
  );
}

export default memo(forwardRef(Cell));
