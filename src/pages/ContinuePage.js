import { useEffect } from "react";
import { useMainContext } from "../context/MainContext";
import Button from "../components/Button/Button";

function ContinuePage(props) {
  console.log("ContinuePage rendered!");

  const { gamers, getCurrentGamer } = useMainContext();

  useEffect(() => {
    return () => console.log("ContinuePage unmounted!");
  }, []);

  const onClick = (buttonName) => {
    switch (buttonName) {
      case "Start Placement":
        props.setPage("PlaceShipPage");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Placement for : {gamers.current[getCurrentGamer()].name}</h1>
      <Button
        name={"Start Placement"}
        className={"main-button"}
        onClick={onClick}
      />
    </div>
  );
}

export default ContinuePage;
