import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";
import { PlaceShipProvider } from "../context/PlaceShipContext";
import Title from "../components/Title/Title";
import BoardPlacement from "../components/Board/BoardPlacement";
import Fleets from "../components/SelectFleet/Fleets";
import "./Pages.css";

function PlaceShipPage(props) {
  console.log("PlaceShipPage rendered!");

  const { gamers, getCurrentGamer } = useMainContext();
  const [currentGamer, setCurrentGamer] = useState(getCurrentGamer());

  useEffect(() => {
    return () => console.log("PlaceShipPage unmounted!");
  }, []);

  return (
    <PlaceShipProvider>
      <div>
        <Title />
        <div className="grid">
          <div>
            {`${gamers.current[currentGamer].name}'s Board`}
            <BoardPlacement />
          </div>
          <Fleets setPage={props.setPage} />
        </div>
      </div>
    </PlaceShipProvider>
  );
}

export default PlaceShipPage;
