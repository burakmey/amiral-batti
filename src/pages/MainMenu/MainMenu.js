import React from "react";
import Title from "../../components/Title/Title";
import Menu from "../../components/Menu/Menu";
import Button from "../../components/Button/Button";
import "../../styles.css";

function MainMenu() {
  return (
    <div>
      <Title />
      <Menu>
        <Button name={"Play"} className={"main-button"} />
        <Button name={"Settings"} className={"sub-button"} />
        <Button name={"Rules"} className={"sub-button"} />
      </Menu>
    </div>
  );
}

export default MainMenu;
