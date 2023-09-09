import React from "react";
import Title from "../../components/Title/Title";
import Menu from "../../components/Menu/Menu";
import Button from "../../components/Button/Button";
import "../../styles.css";
import SelectPlayers from "../../components/SelectPlayers/SelectPlayers";

function PlayMenu() {
  console.log("PlayMenu rendered!");
  return (
    <div>
      <Title />
      <Menu arrowClassName={"arrow-primary"}>
        <SelectPlayers />
        <Button name={"Back to Main Menu"} className={"sub-button"} />
      </Menu>
    </div>
  );
}

export default PlayMenu;
