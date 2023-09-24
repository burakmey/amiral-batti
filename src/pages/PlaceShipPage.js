import { useEffect } from "react";
import Title from "../components/Title/Title";
import BoardPlacement from "../components/Board/BoardPlacement";
import "./Pages.css";
import Fleets from "../components/SelectFleet/Fleets";
import { PlaceShipProvider } from "../context/PlaceShipContext";

function PlaceShipPage() {
  console.log("PlaceShipPage rendered!");

  useEffect(() => {
    return () => console.log("PlaceShipPage unmounted!");
  }, []);

  return (
    <PlaceShipProvider>
      <div>
        <Title />
        <div className="grid">
          <BoardPlacement />
          <Fleets />
        </div>
      </div>
    </PlaceShipProvider>
  );
}

export default PlaceShipPage;
