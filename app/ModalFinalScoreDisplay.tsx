import React, { useContext } from "react";
import gameDataContext from "./state-management/contexts/gameDataContext";

// Message displaying the player's end game score within
// the EndGameModal
const ModalFinalscoreDisplay = () => {
  const { score } = useContext(gameDataContext);

  return (
    <h2 className="my-7 text-lg text-center">{`Final score: ${score}`}</h2>
  );
};

export default ModalFinalscoreDisplay;
