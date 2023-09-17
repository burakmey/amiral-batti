import { useEffect } from "react";
import Title from "../components/Title/Title";
import Board from "../components/Board/Board";
import "./Pages.css";
import SelectFleet from "../components/SelectFleet/SelectFleet";

function PlaceShipPage() {
  console.log("PlaceShipPage rendered!");

  useEffect(() => {
    return () => console.log("PlaceShipPage unmounted!");
  }, []);
  return (
    <div>
      {/* <Title /> */}
      <div className="place-ship-page">
        <Board />
        <SelectFleet />
      </div>
    </div>
  );
}

export default PlaceShipPage;
