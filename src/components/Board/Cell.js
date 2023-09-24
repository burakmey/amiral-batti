import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { RiShipLine } from "react-icons/ri";
import { LuWaves } from "react-icons/lu";
import "./Board.css";

function Cell(props, ref) {
  console.log("Cell rendered!");
  const [icon, setIcon] = useState(<LuWaves />);
  const [isHit, setIsHit] = useState(false);
  const [className, setClassName] = useState(props.className);
  let bool = true;

  useImperativeHandle(ref, () => ({
    setShip: setShip,
    setWave: setWave,
    setHit: setHit,
    setUnHit: setUnHit,
  }));

  const setShip = () => {
    if (bool) {
      setIcon(<RiShipLine />);
      setClassName(`${props.className} suitable-fleet`);
    }
  };

  const setWave = () => {
    if (bool) {
      setIcon(<LuWaves />);
      setClassName(`${props.className}`);
    }
  };

  const setHit = () => {
    bool = false;
    setIsHit(true);
    setClassName(`${props.className} placed-fleet`);
  };

  const setUnHit = () => {
    bool = true;
    setIsHit(false);
    setWave();
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
