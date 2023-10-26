import { useEffect } from "react";
import Button from "../Button/Button";
import "./Controller.css";

function Controller() {
  console.log("Controller rendered!");
  useEffect(() => {
    return () => console.log("Controller unmounted!");
  }, []);

  const onClick = (buttonName) => {
    switch (buttonName) {
      case "--":
        break;
      case "start":
        break;
      case "++":
        break;
      default:
        break;
    }
  };

  return (
    <div className="controller">
      <Button name={"--"} className={"sub-button"} onClick={onClick} />
      <Button name={"start"} className={"sub-button"} onClick={onClick} />
      <Button name={"++"} className={"sub-button"} onClick={onClick} />
    </div>
  );
}

export default Controller;
