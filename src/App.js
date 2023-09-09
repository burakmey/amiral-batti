import Button from "./components/Button/Button";
import "./App.css";

function App() {
  return (
    <div className="App">
      App
      <div>
        <Button name={"Play"} className={"main-button"} />
        <Button name={"Settings"} className={"sub-button"} />
        <Button name={"Rules"} className={"sub-button"} />
      </div>
    </div>
  );
}

export default App;
