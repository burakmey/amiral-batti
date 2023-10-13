import { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import SelectFleet from "./SelectFleet";
import Button from "../Button/Button";
import "./SelectFleet.css";

function Fleets(props) {
  console.log("Fleets rendered!");

  const { gamers, board0, board1, getCurrentGamer } = useMainContext();
  const { selectFleetRef, maxFleetCount, placedFleets } = usePlaceShipContext();

  useEffect(() => {
    return () => console.log("Fleets unmounted!");
  }, []);

  const onClick = (buttonName) => {
    switch (buttonName) {
      case "Finish":
        if (placedFleets.length === maxFleetCount) {
          let currentGamer = getCurrentGamer();
          console.log("Placement finised for player :", currentGamer);
          gamers.current[currentGamer].isPlacementFinished = true;
          if (currentGamer === 0) {
            placedFleets.forEach((object) => {
              board0.push(object.location);
            });
          } else if (currentGamer === 1) {
            placedFleets.forEach((object) => {
              board1.push(object.location);
            });
          }
          currentGamer = getCurrentGamer();
          if (currentGamer !== -1) {
            console.log("New placement for player :", currentGamer);
            props.setPage("ContinuePage");
          } else {
            console.log("Completed!");
            props.setPage("GamePage");
          }
          console.log(board0);
          console.log(board1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="fleets-and-button">
      <div className="fleets">
        <SelectFleet
          ref={(ref) => (selectFleetRef.current[0] = ref)}
          shipCount={5}
          id={0}
        />
        <SelectFleet
          ref={(ref) => (selectFleetRef.current[1] = ref)}
          shipCount={4}
          id={1}
        />
        <SelectFleet
          ref={(ref) => (selectFleetRef.current[2] = ref)}
          shipCount={3}
          id={2}
        />
        <SelectFleet
          ref={(ref) => (selectFleetRef.current[3] = ref)}
          shipCount={3}
          id={3}
        />
        <SelectFleet
          ref={(ref) => (selectFleetRef.current[4] = ref)}
          shipCount={2}
          id={4}
        />
      </div>
      <Button name={"Finish"} className={"main-button"} onClick={onClick} />
    </div>
  );
}

export default Fleets;
