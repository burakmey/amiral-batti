import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { RiShipLine } from "react-icons/ri";
import { LuWaves } from "react-icons/lu";
import "./Board.css";

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
    setUnHit: setUnHit,
    setAvailable: setAvailable,
    setUnavailable: setUnavailable,
  }));

  const setShip = () => {
    if (bool) {
      setIcon(<RiShipLine />);
    }
  };

  const setWave = () => {
    if (bool) {
      setIcon(<LuWaves />);
      setClassName("cell");
    }
  };

  const setHit = () => {
    bool = false;
    setIsHit(true);
    setClassName("cell cell-clicked");
  };

  const setUnHit = () => {
    bool = true;
    setIsHit(false);
    setWave();
  };

  const setAvailable = () => {
    setClassName("cell cell-available");
  };

  const setUnavailable = () => {
    setClassName("cell cell-unavailable");
  };

  const onMouseEnter = () => {
    props.onMouseEnter(props.id);
  };

  const onMouseLeave = () => {
    props.onMouseLeave(props.id);
  };

  const onClick = () => {
    props.onClick(props.id);
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
