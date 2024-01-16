import { useContext, useEffect, useState } from "react";
import HighscoreSubmitForm from "./HighscoreSubmitForm";
import LoseMessage from "./LoseMessage";
import ModalHighscoreDisplay from "./ModalHighscoreDisplay";
import Spinner from "./Spinner";
import WinMessage from "./WinMessage";
import { useHighscores } from "./hooks/useHighscores";
import useRestartGame from "./hooks/useRestartGame";
import gameDataContext from "./state-management/contexts/gameDataContext";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import restartGameContext from "./state-management/contexts/restartGameContext";

const EndGameModal = () => {
  const { data: highscores, error, isLoading } = useHighscores();

  const { setIsModalOpen } = useContext(isModalOpenContext);
  const { score, win, lose } = useContext(gameDataContext);
  const { restartGame, setRestartGame } = useContext(restartGameContext);

  const [showEndGameModal, setShowEndGameModal] = useState<boolean>(false);

  // if the end game score is greater than the current lowest
  // highscore, they can submit their highscore.
  // if there are less than 10 highscores currently, the player can
  // submit their highscore regardless.
  const showSubmit =
    highscores &&
    (highscores.length < 10 || score > highscores[highscores.length - 1].score);

  useEffect(() => {
    if (win || lose) {
      setShowEndGameModal(true);
      setIsModalOpen(true)
    }
  }, [win, lose]);

  useRestartGame(restartGame);

  useEffect(() => {
    if (restartGame) {
      setShowEndGameModal(false);
      setRestartGame(false);
    }
  }, [restartGame]);

  const handleClose = () => {
    setIsModalOpen(false);
    setShowEndGameModal(false);
  };

  return (
    <div className="text-white">
      <dialog open={showEndGameModal} id="end_game_modal" className="modal">
        <div className="modal-box">
          <div className="text-white text-center text-2xl">
            {win ? <WinMessage /> : lose ? <LoseMessage /> : null}
          </div>
          <ModalHighscoreDisplay />
          {isLoading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-center text-red-600">
              Error fetching highscores
            </p>
          ) : showSubmit ? (
            <HighscoreSubmitForm handleClose={handleClose} />
          ) : null}
          <div className={`flex justify-center ${showSubmit ? "mt-5" : null}`}>
            <button className="btn" onClick={() => setRestartGame(true)}>
              Restart Game?
            </button>
          </div>
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
