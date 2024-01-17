import { SavedGame } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import Spinner from "./Spinner";
import useCloseModalAndMessageTimeout from "./hooks/useCloseModalAndMessageTimeout";
import useIsModalOpen from "./hooks/useIsModalOpen";
import gameDataContext from "./state-management/contexts/gameDataContext";

interface Props {
  isLoadGameModalOpen: boolean;
  setIsLoadGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadGameModal = ({
  isLoadGameModalOpen,
  setIsLoadGameModalOpen,
}: Props) => {
  // Context for the game data
  const { setBoardData, setScore, setGameOver, setWin, setLose } =
    useContext(gameDataContext);

  // saved game data is fetched with React Query and Axios
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

  // State variable tracking whether or not a saved game exists
  const [noSavedGame, setNoSavedGame] = useState(false);

  // Function for loading the saved game data
  const loadGame = async () => {
    // If error, stop
    if (error) {
      return;
    }

    // if there is no currently saved game for the user and stop
    if (!savedGame) {
      setNoSavedGame(true);
      return;
    }

    // At this point there is saved game data
    setNoSavedGame(false);

    // Retrieve the saved board data and the score
    const boardData = JSON.parse(savedGame.boardData);
    const score = savedGame.score;

    // Set all game data to match the loaded game data
    // and close the modal
    setBoardData(boardData);
    setScore(score);
    setGameOver(false);
    setWin(false);
    setLose(false);
    setIsLoadGameModalOpen(false);
  };

  // Close modal
  const closeModal = useCloseModalAndMessageTimeout(
    setIsLoadGameModalOpen,
    setNoSavedGame
  );

  // Custom hook for telling the game a modal is open and for
  // refetching the highscores.
  useIsModalOpen(isLoadGameModalOpen, refetch);

  return (
    <dialog id="load_game_modal" className="modal" open={isLoadGameModalOpen}>
      <div className="modal-box text-white">
        <h3 className="font-bold text-2xl text-center">
          Load Current Saved Game?
        </h3>
        <p className="py-4 text-center">
          This will overrite your current game progress
        </p>
        {/* An error message if an error occurs or there is no saved game.
            A fetch message and spinner if data is being fetched.
            Otherwise we get an empty string
        */}
        {error ? (
          <p className="text-center text-red">Error. Cannot load game data</p>
        ) : isLoading ? (
          <>
            <p className="text-center">Fetching data. Please wait...</p>
            <div className="text-center my-5">
              <Spinner />
            </div>
          </>
        ) : noSavedGame ? (
          <p className="text-center text-red">No saved data found</p>
        ) : (
          ""
        )}
        {/* If game is loading or an error occurs, the button is disabled */}
        <div className="flex justify-center gap-4 py-3 mt-3">
          <button
            onClick={loadGame}
            className={"btn"}
            disabled={isLoading || (error ? true : false)}
          >
            Load Game
          </button>
          {/* Button to close the modal */}
          <button onClick={closeModal} className="btn">
            Cancel
          </button>
        </div>
      </div>
      {/* Modal is closed if player clicks outside */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>Close</button>
      </form>
    </dialog>
  );
};

export default LoadGameModal;
