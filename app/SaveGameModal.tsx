import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import useCloseModalMessageTimeout from "./hooks/useCloseModalMessageTimeout";
import useIsModalOpen from "./hooks/useIsModalOpen";
import gameDataContext from "./state-management/contexts/gameDataContext";

interface Props {
  isSaveGameModalOpen: boolean;
  setIsSaveGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SaveGameData {
  serializedBoard: string;
  score: number;
}

// Modal where the user can save their game data 
const SaveGameModal = ({
  isSaveGameModalOpen,
  setIsSaveGameModalOpen,
}: Props) => {

  // Context for game data
  const { boardData, score } = useContext(gameDataContext);

  // State for tracking whether or not to display an error message
  const [showError, setShowError] = useState<boolean>(false);

  // mutation function for saving game data
  const saveGame = async (data: SaveGameData) => {
    await axios.post("/api/savedGame", data);
  };

  // mutation hook for saving game data
  const submitGameData = useMutation<void, Error, SaveGameData>({
    mutationFn: saveGame,
    onSuccess: () => {
      closeModal();
    },
    retry: 3,
    onError: () => {
      setShowError(true);
    },
  });

  // Function for calling the mutate hook and sending 
  // the board and score data. 
  const handleSave = () => {
    const serializedBoard = JSON.stringify(boardData);
    submitGameData.mutate({ serializedBoard, score });
  };

  // Custom hook for closing the modal and error message
  const closeModal = useCloseModalMessageTimeout(setIsSaveGameModalOpen, setShowError);

  // Custom hook for telling the game a modal is open and for
  // refetching the highscores.
  useIsModalOpen(isSaveGameModalOpen);

  return (
    <dialog id="save_game_modal" className="modal" open={isSaveGameModalOpen}>
      <div className="modal-box text-white">
        <h3 className="font-bold text-2xl text-center">Save Your Game?</h3>
        <p className="py-4 text-center">
          This will overrite any previous saved progress
        </p>
        <div className="flex justify-center gap-4 py-3">
          {/* Button displays Save Game by default
              If game is being saved, button is disabled 
              and displays the message Saving... */}
          <button
            onClick={handleSave}
            className="btn"
            disabled={submitGameData.isPending}
          >
            {submitGameData.status === "pending" ? "Saving..." : "Save Game"}
          </button>
          {/* Button to close modal.
              Disabled if data is being submitted */}
          <button
            onClick={closeModal}
            className="btn"
            disabled={submitGameData.isPending}
          >
            Cancel
          </button>
        </div>
        {/* If game is unable to be saved, an error message is shown */}
        {showError && (
          <p className="text-red-600 text-center my-3">
            Error: Unable to save game
          </p>
        )}
      </div>
      {/* Modal closes if player clicks outside */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>Close</button>
      </form>
    </dialog>
  );
};

export default SaveGameModal;
