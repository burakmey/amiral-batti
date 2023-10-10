import { useEffect } from "react";
import Arrow from "../Arrow/Arrow";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./Menu.css";

function Menu(props) {
  console.log("Menu rendered!");

  useEffect(() => {
    return () => console.log("Menu unmounted!");
  }, []);

  return (
    <div className="menu">
      <Arrow className={props.arrowClassName} onClick={props.arrowUpClick}>
        <IoIosArrowUp />
      </Arrow>
      {props.children}
      <Arrow className={props.arrowClassName} onClick={props.arrowDownClick}>
        <IoIosArrowDown />
      </Arrow>
    </div>
  );
}

export default Menu;
