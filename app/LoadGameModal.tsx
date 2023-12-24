import React, { useContext, useEffect, useState } from "react";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import axios from "axios";
import gameDataContext from "./state-management/contexts/gameDataContext";
import { useQuery } from "@tanstack/react-query";
import { SavedGame } from "@prisma/client";
import Spinner from "./components/Spinner";

interface Props {
  isLoadGameModalOpen: boolean;
  onClose: () => void;
}

const LoadGameModal = ({ isLoadGameModalOpen, onClose }: Props) => {
  const { setBoardData, setScore, setGameOver, setWin, setLose } =
    useContext(gameDataContext);
  const { setIsModalOpen } = useContext(isModalOpenContext);

  const {
    data: savedGame,
    isLoading,
    error,
    refetch,
  } = useQuery<SavedGame>({
    queryKey: ["savedGame"],
    queryFn: () =>
      axios.get<SavedGame>("/api/savedGame").then((res) => res.data),
  });

  const [noSavedGame, setNoSavedGame] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoadGameModalOpen) {
      setIsModalOpen(true);
      refetch();
    } else {
      setIsModalOpen(false);
    }
  }, [isLoadGameModalOpen]);

  // Cleanup function to clear the timeout
  // This is to prevent potential side effects if the component unmounts
  // before the timeout completes.
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const loadGame = async () => {
    if (error) {
      return;
    }

    // if there is no currently saved game for the user
    if (!savedGame) {
      setNoSavedGame(true);
      return;
    }
    setNoSavedGame(false);

    const boardData = JSON.parse(savedGame.boardData);
    const score = savedGame.score;

    setBoardData(boardData);
    setScore(score);
    setGameOver(false);
    setWin(false);
    setLose(false);
    onClose();
  };

  const closeModal = () => {
    // Keep NoSavedGame message open as modal closes
    const id = setTimeout(() => {
      setNoSavedGame(false);
    }, 1000);
    setTimeoutId(id);
    onClose(); // close the modal
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
        {error ? (
          <p className="text-center text-red-600">
            Error. Cannot load game data
          </p>
        ) : isLoading ? (
          <>
            <p className="text-center">Fetching data. Please wait...</p>
            <div className="text-center my-5">
              <Spinner />
            </div>
          </>
        ) : noSavedGame ? (
          <p className="text-center text-red-600">No saved data found</p>
        ) : (
          ""
        )}
        <div className="flex justify-center gap-4 py-3">
          <button
            onClick={loadGame}
            className={"btn"}
            disabled={isLoading || (error ? true : false)}
          >
            Load Game
          </button>
          <button onClick={closeModal} className="btn">
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>Close</button>
      </form>
    </dialog>
  );
};

export default LoadGameModal;
