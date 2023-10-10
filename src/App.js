import { useState } from "react";
import { MainProvider } from "./context/MainContext";
import MainMenu from "./pages/MainMenu";
import PlayMenu from "./pages/PlayMenu";
import ContinuePage from "./pages/ContinuePage";
import PlaceShipPage from "./pages/PlaceShipPage";
import "./App.css";

function App() {
  console.log("App rendered!");

  const [activePage, setActivePage] = useState("MainMenu");

  const setPage = (pageName) => {
    switch (pageName) {
      case "MainMenu":
        setActivePage(pageName);
        break;
      case "PlayMenu":
        setActivePage(pageName);
        break;
      case "ContinuePage":
        setActivePage(pageName);
        break;
      case "PlaceShipPage":
        setActivePage(pageName);
        break;
      case "GamePage":
        //setActivePage(pageName);
        console.log(pageName);
        break;
      default:
        break;
    }
  };
  return (
    <MainProvider>
      <div className="App">
        <div>
          {activePage === "MainMenu" ? <MainMenu setPage={setPage} /> : null}
          {activePage === "PlayMenu" ? <PlayMenu setPage={setPage} /> : null}
          {activePage === "ContinuePage" ? (
            <ContinuePage setPage={setPage} />
          ) : null}
          {activePage === "PlaceShipPage" ? (
            <PlaceShipPage setPage={setPage} />
          ) : null}
        </div>
      </div>
    </MainProvider>
  );
}

export default App;
