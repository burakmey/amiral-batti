import { useState } from "react";
import MainMenu from "./pages/MainMenu";
import PlayMenu from "./pages/PlayMenu";
import Board from "./components/Board/Board";
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
      default:
        break;
    }
  };
  return (
    <div className="App">
      <div>
        {/* {activePage === "MainMenu" ? <MainMenu setPage={setPage} /> : null}
        {activePage === "PlayMenu" ? <PlayMenu setPage={setPage} /> : null} */}
        <Board />
      </div>
    </div>
  );
}

export default App;
