import React, { useContext, useEffect } from "react";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import axios from "axios";
import gameDataContext from "./state-management/contexts/gameDataContext";

interface Props {
  isLoadGameModalOpen: boolean;
  onClose: () => void;
}

const LoadGameModal = ({ isLoadGameModalOpen, onClose }: Props) => {
  const { setBoardData, setScore, setGameOver, setWin, setLose } = useContext(gameDataContext);
  const { setIsModalOpen } = useContext(isModalOpenContext);

  useEffect(() => {
    if (isLoadGameModalOpen) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [isLoadGameModalOpen]);

  const loadGame = async () => {
    try {
      const savedGame = (await axios.get("/api/savedGame")).data;
      const boardData = JSON.parse(savedGame.boardData);
      const score = JSON.parse(savedGame.score);

      setBoardData(boardData)
      setScore(score)
      setGameOver(false)
      setWin(false)
      setLose(false)
    } catch (error) {
      console.log("Error loading game: ", error);
    }
  };

  return (
    <dialog id="load_game_modal" className="modal" open={isLoadGameModalOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-2xl text-center">
          Load Current Saved Game?
        </h3>
        <p className="py-4 text-center">
          This will overrite your current game progress
        </p>
        <div className="flex justify-center gap-4 py-3">
          <button
            onClick={() => {
              loadGame();
              onClose();
            }}
            className="btn"
          >
            Load Game
          </button>
          <button onClick={onClose} className="btn">
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>Close</button>
      </form>
    </dialog>
  );
};

export default LoadGameModal;
