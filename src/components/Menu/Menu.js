import React from "react";
import Arrow from "../Arrow/Arrow";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./Menu.css";
import "../../styles.css";

function Menu(props) {
  return (
    <div className="menu">
      <Arrow className={props.arrowClassName}>
        <IoIosArrowUp />
      </Arrow>
      {props.children}
      <Arrow className={props.arrowClassName}>
        <IoIosArrowDown />
      </Arrow>
    </div>
  );
}

export default Menu;
