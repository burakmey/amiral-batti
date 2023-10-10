import { useEffect } from "react";
import Title from "../components/Title/Title";
import Menu from "../components/Menu/Menu";
import Button from "../components/Button/Button";
import "./Pages.css";

function MainMenu(props) {
  useEffect(() => {
    return () => console.log("MainMenu unmounted!");
  }, []);

  const onClick = (buttonName) => {
    switch (buttonName) {
      case "Play":
        props.setPage("PlayMenu");
        break;
      case "Settings":
        props.setPage("PlayMenu");
        break;
      case "Rules":
        props.setPage("PlayMenu");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Title />
      <Menu arrowClassName={"arrow-primary"}>
        <Button name={"Play"} className={"main-button"} onClick={onClick} />
        <Button name={"Settings"} className={"sub-button"} onClick={onClick} />
        <Button name={"Rules"} className={"sub-button"} onClick={onClick} />
      </Menu>
    </div>
  );
}

export default MainMenu;
