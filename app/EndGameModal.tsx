import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HighscoreSubmitForm from "./components/HighscoreSubmitForm";
import ModalHighscoreDisplay from "./components/ModalHighscoreDisplay";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import WinMessage from "./WinMessage";
import LoseMessage from "./LoseMessage";
import gameDataContext from "./state-management/contexts/gameDataContext";

interface Props {
  win: boolean;
  lose: boolean;
}

const EndGameModal = ({ win, lose }: Props) => {
  const { setIsModalOpen } = useContext(isModalOpenContext);
  const { score } = useContext(gameDataContext);

  const [showSubmit, setShowSubmit] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);

  // if the end game score is greater than the current lowest
  // highscore, they can submit their highscore.
  // if there are less than 10 highscores currently, the player can
  // submit their highscore regardless.
  useEffect(() => {
    const getHighscores = async () => {
      try {
        const response = await axios.get("/api/highscores");
        const highscoreData = response.data;

        // if player gets a highscore or if there are less than 10
        // highscores stored, the submit form for highscores will show
        if (
          highscoreData.length < 10 ||
          score > highscoreData[highscoreData.length - 1].score
        )
        setShowSubmit(true);
      } catch (error) {
        console.error("Error fetching highscores: ", error);
      }
    };

    if (win || lose) {
      getHighscores();
      setShowEndGameModal(true)
    } 
  }, [win, lose]);

  const handleClose = () => {
    setIsModalOpen(false);
    setShowEndGameModal(false)
  };

  return (
    <div className="text-white">
      <dialog
        open={showEndGameModal}
        id="end_game_modal"
        className="modal"
      >
        <div className="modal-box">
          <div className="text-white text-center text-2xl">
            {win ? <WinMessage /> : lose ? <LoseMessage /> : null}
          </div>
          <ModalHighscoreDisplay />
          {showSubmit && <HighscoreSubmitForm handleClose={handleClose}/>}
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={handleClose}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <button onClick={handleClose} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EndGameModal;
