import { useEffect } from "react";
import Title from "../components/Title/Title";
import Menu from "../components/Menu/Menu";
import SelectPlayers from "../components/SelectPlayers/SelectPlayers";
import Button from "../components/Button/Button";
import "../styles.css";

function PlayMenu(props) {
  console.log("PlayMenu rendered!");

  useEffect(() => {
    return () => console.log("PlayMenu unmounted!");
  }, []);

  const onClick = (buttonName) => {
    switch (buttonName) {
      case "Back to Main Menu":
        props.setPage("MainMenu");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Title />
      <Menu arrowClassName={"arrow-primary"}>
        <SelectPlayers setPage={props.setPage} />
        <Button
          name={"Back to Main Menu"}
          className={"sub-button"}
          onClick={onClick}
        />
      </Menu>
    </div>
  );
}

export default PlayMenu;
