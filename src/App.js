import Button from "./components/Button/Button";
import Arrow from "./components/Arrow/Arrow";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./App.css";

function App() {
  return (
    <div className="App">
      App
      <div>
        <Arrow className={"arrow-primary"}>
          <IoIosArrowUp />
        </Arrow>
        <Button name={"Play"} className={"main-button"} />
        <Button name={"Settings"} className={"sub-button"} />
        <Button name={"Rules"} className={"sub-button"} />
        <Arrow className={"arrow-primary"}>
          <IoIosArrowDown />
        </Arrow>
      </div>
    </div>
  );
}

export default App;
