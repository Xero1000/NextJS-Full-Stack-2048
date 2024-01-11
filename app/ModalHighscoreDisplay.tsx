import React, { useContext } from "react";
import gameDataContext from "./state-management/contexts/gameDataContext";

const ModalHighscoreDisplay = () => {
  const { score } = useContext(gameDataContext);

  return (
    <h2 className="my-7 text-lg text-center">{`Final score: ${score}`}</h2>
  );
};

export default ModalHighscoreDisplay;
