import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { RiShipLine } from "react-icons/ri";
import { LuWaves } from "react-icons/lu";
import "./Board.css";
import "../../styles.css";

function Cell(props, ref) {
  console.log("Cell rendered!");
  const [icon, setIcon] = useState(<LuWaves />);
  const [isHit, setIsHit] = useState(false);
  const [className, setClassName] = useState("cell");
  let bool = true;

  useImperativeHandle(ref, () => ({
    setShip: setShip,
    setWave: setWave,
    setHit: setHit,
  }));

  const setShip = () => {
    if (bool) {
      setIcon(<RiShipLine />);
      updateClassName("suitable-fleet");
    }
  };

  const setWave = () => {
    if (bool) {
      setIcon(<LuWaves />);
      updateClassName("");
    }
  };

  const setHit = () => {
    bool = false;
    setIsHit(true);
    updateClassName("placed-fleet");
  };

  const updateClassName = (className) => {
    setClassName(`cell ${className}`);
  };

  const onMouseEnter = () => {
    props.onMouseEnter(props.id);
  };

  const onMouseLeave = () => {
    props.onMouseLeave();
  };

  const onClick = () => {
    props.onClick();
  };

  return (
    <div
      className={className}
      onMouseEnter={!isHit ? onMouseEnter : null}
      onMouseLeave={!isHit ? onMouseLeave : null}
      onClick={!isHit ? onClick : null}
    >
      {icon}
    </div>
  );
}

export default forwardRef(Cell);
