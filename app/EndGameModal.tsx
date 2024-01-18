'use client'

import { useContext, useEffect, useState } from "react";
import HighscoreSubmitForm from "./HighscoreSubmitForm";
import LoseMessage from "./LoseMessage";
import ModalFinalScoreDisplay from "./ModalFinalScoreDisplay";
import Spinner from "./Spinner";
import WinMessage from "./WinMessage";
import { useHighscores } from "./hooks/useHighscores";
import useRestartGame from "./hooks/useRestartGame";
import gameDataContext from "./state-management/contexts/gameDataContext";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import restartGameContext from "./state-management/contexts/restartGameContext";

const EndGameModal = () => {
  // Fetch the current highscores 
  const { data: highscores, error, isLoading } = useHighscores();

  // contexts
  const { setIsModalOpen } = useContext(isModalOpenContext);
  const { score, win, lose } = useContext(gameDataContext);
  const { restartGame, setRestartGame } = useContext(restartGameContext);

  // State for trackign if EndGameModal is open
  const [showEndGameModal, setShowEndGameModal] = useState<boolean>(false);

  // if the end game score is greater than the current lowest
  // highscore, they can submit their highscore.
  // if there are less than 10 highscores currently, the player can
  // submit their highscore regardless.
  const showSubmit =
    highscores &&
    (highscores.length < 10 || score > highscores[highscores.length - 1].score);

  // If win or lose conditions are met, 
  // the end game modal will appear
  useEffect(() => {
    if (win || lose) {
      setShowEndGameModal(true);
      setIsModalOpen(true)
    }
  }, [win, lose, setIsModalOpen]);

  // custom hook for starting a new game
  useRestartGame(restartGame);

  // EndGameModal closes if its restart button is clicked
  useEffect(() => {
    if (restartGame) {
      setShowEndGameModal(false);
      setRestartGame(false);
    }
  }, [restartGame, setRestartGame]);

  // Tells the game that no modals are open
  const handleClose = () => {
    setIsModalOpen(false);
    setShowEndGameModal(false);
  };

  return (
    <div className="text-white">
      <dialog open={showEndGameModal} id="end_game_modal" className="modal">
        <div className="modal-box">
          {/* The message shown depends on if player won or lost */}
          <div className="text-white text-center text-2xl">
            {win ? <WinMessage /> : lose ? <LoseMessage /> : null}
          </div>
          {/* The player's  score at the end of the game is displayed*/}
          <ModalFinalScoreDisplay />
          {/* A spinner if highscores are being fetched,
              An error message if they can't be fetched,
              if player achieved a highscore, the form to 
              submit it will appear. */}
          {isLoading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-center text-red">
              Error fetching highscores
            </p>
          ) : showSubmit ? (
            <HighscoreSubmitForm handleClose={handleClose} />
          ) : null}
          {/* Button for player to start a new game */}
          <div className={`flex justify-center ${showSubmit ? "mt-5" : null}`}>
            <button className="btn" onClick={() => setRestartGame(true)}>
              Restart Game?
            </button>
          </div>
          {/* X and Close buttons to close the modal */}
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
