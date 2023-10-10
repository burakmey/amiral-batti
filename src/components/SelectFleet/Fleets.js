import React from "react";
import { useMainContext } from "../../context/MainContext";
import { usePlaceShipContext } from "../../context/PlaceShipContext";
import SelectFleet from "./SelectFleet";
import Button from "../Button/Button";
import "./SelectFleet.css";

function Fleets(props) {
  console.log("Fleets rendered!");

  const { selectFleetRef, maxFleetCount, placedFleets } = usePlaceShipContext();
  const { gamers } = useMainContext();

  const onClick = (buttonName) => {
    switch (buttonName) {
      case "Finish":
        if (placedFleets.length === maxFleetCount) {
          let isFinished = true;
          console.log("Placement finised!");
          for (let i = 0; i < gamers.current.length; i++) {
            if (
              gamers.current[i].isPlayer &&
              !gamers.current[i].isPlacementFinished
            ) {
              console.log("New placement for other player");
              isFinished = false;
            }
          }
          if (isFinished) {
            props.setPage("MainMenu");
          } else {
            props.setPage("PlaceShipPage");
          }
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
