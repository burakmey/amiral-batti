import { useCallback, useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Controller.css";

function Controller() {
  console.log("Controller rendered!");

  const [buttonName, setButtonName] = useState("Start");

  useEffect(() => {
    return () => console.log("Controller unmounted!");
  }, []);

  useEffect(() => {}, [buttonName]);

  const onClick = useCallback((buttonName) => {
    switch (buttonName) {
      case "--":
        break;
      case "Start":
        setButtonName("Stop");
        break;
      case "Stop":
        setButtonName("Start");
        break;
      case "++":
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="controller">
      <Button name={"--"} className={"sub-button"} onClick={onClick} />
      <Button name={buttonName} className={"sub-button"} onClick={onClick} />
      <Button name={"++"} className={"sub-button"} onClick={onClick} />
    </div>
  );
}

export default Controller;
