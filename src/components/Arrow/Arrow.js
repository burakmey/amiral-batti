import { useState, memo } from "react";
import "./Arrow.css";
import "../../styles.css";

function Arrow(props) {
  console.log("Arrow rendered!");

  const [className, setClassName] = useState(`arrow ${props.className}`);

  const updateStyle = (isOnMouse) => {
    setClassName(
      `arrow ${props.className} ${isOnMouse ? "arrow-on-mouse" : ""}`
    );
  };

  return (
    <div
      className={className}
      onMouseEnter={() => updateStyle(true)}
      onMouseLeave={() => updateStyle(false)}
      onClick={() => console.log("Arrow clicked.")}
    >
      {props.children}
    </div>
  );
}

export default memo(Arrow);
