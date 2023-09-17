import { useEffect } from "react";
import Title from "../components/Title/Title";
import Board from "../components/Board/Board";
import "./Pages.css";
import Fleets from "../components/SelectFleet/Fleets";

function PlaceShipPage() {
  console.log("PlaceShipPage rendered!");

  useEffect(() => {
    return () => console.log("PlaceShipPage unmounted!");
  }, []);
  return (
    <div>
      <Title />
      <div className="grid">
        <Board />
        <Fleets />
      </div>
    </div>
  );
}

export default PlaceShipPage;
