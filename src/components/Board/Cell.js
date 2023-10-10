import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { LuWaves } from "react-icons/lu";
import { RiShipLine } from "react-icons/ri";
import "./Board.css";

function Cell(props, ref) {
  console.log("Cell rendered!");
  const [icon, setIcon] = useState(<LuWaves />);
  const [isHit, setIsHit] = useState(false);
  const [className, setClassName] = useState("cell");
  let bool = true;

  useEffect(() => {
    return () => console.log("Cell unmounted!");
  }, []);

  useImperativeHandle(ref, () => ({
    setShip: setShip,
    setWave: setWave,
    setHit: setHit,
    setUnHit: setUnHit,
    setAvailable: setAvailable,
    setUnavailable: setUnavailable,
    setDefault: setDefault,
  }));

  const setShip = () => {
    if (bool) {
      setIcon(<RiShipLine />);
    }
  };

  const setWave = () => {
    if (bool) {
      setIcon(<LuWaves />);
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
    setIcon(<LuWaves />);
    setClassName("cell");
  };

  const setAvailable = () => {
    setClassName("cell cell-available");
  };

  const setUnavailable = () => {
    setClassName("cell cell-unavailable");
  };

  const setDefault = () => {
    setClassName("cell");
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
