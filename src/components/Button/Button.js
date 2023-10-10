import { useState, memo } from "react";
import "./Button.css";

function Button(props) {
  console.log(`Button: ${props.name} rendered!`);

  const [className, setClassName] = useState(`button ${props.className}`);

  const updateStyle = (isOnMouse) => {
    setClassName(
      `button ${props.className} ${isOnMouse ? "button-on-mouse" : ""}`
    );
  };

  return (
    <div
      className={className}
      onMouseEnter={() => updateStyle(true)}
      onMouseLeave={() => updateStyle(false)}
      onClick={() => props.onClick(props.name)}
    >
      {props.name}
    </div>
  );
}

export default memo(Button);
