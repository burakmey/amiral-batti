import { memo } from "react";
import "./Title.css";

function Title() {
  console.log("Title rendered!");
  return (
    <div className="title">
      <span className="title-text">AMIRAL BATTI</span>
    </div>
  );
}

export default memo(Title);
