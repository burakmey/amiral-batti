import { useState, useEffect, memo } from "react";
import "./Button.css";

function Button(props) {
  console.log(`Button: ${props.name} rendered!`);

  const [className, setClassName] = useState(`button ${props.className}`);

  useEffect(() => {
    return () => console.log(`Button: ${props.name} unmounted!`);
  }, []);

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
