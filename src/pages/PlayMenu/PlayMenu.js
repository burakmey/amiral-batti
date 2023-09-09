import React from "react";
import Title from "../../components/Title/Title";
import Menu from "../../components/Menu/Menu";
import Button from "../../components/Button/Button";
import "../../styles.css";

function PlayMenu() {
  return (
    <div>
      <Title />
      <Menu>
        <Button name={"Start"} className={"main-button"} />
        <Button name={"Back to Main Menu"} className={"sub-button"} />
      </Menu>
    </div>
  );
}

export default PlayMenu;
