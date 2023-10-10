import { useState, memo } from "react";
import "./Arrow.css";

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
      onClick={() => props.onClick()}
    >
      {props.children}
    </div>
  );
}

export default memo(Arrow);
