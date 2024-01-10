import React, { useContext, useEffect, useState } from "react";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import gameDataContext from "./state-management/contexts/gameDataContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface Props {
  isSaveGameModalOpen: boolean;
  onClose: () => void;
}

interface SaveGameData {
  serializedBoard: string;
  score: number;
}

const SaveGameModal = ({ isSaveGameModalOpen, onClose }: Props) => {
  const { setIsModalOpen } = useContext(isModalOpenContext);
  const { boardData, score } = useContext(gameDataContext);
  const [showError, setShowError] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const saveGame = async (data: SaveGameData) => {
    await axios.post("/api/savedGame", data);
  };

  const submitGameData = useMutation<void, Error, SaveGameData>({
    mutationFn: saveGame,
    onSuccess: () => {
      closeModal()
    },
    retry: 3,
    onError: () => {
      setShowError(true)
    }
  });

  const handleSave = () => {
    const serializedBoard = JSON.stringify(boardData)
    submitGameData.mutate({ serializedBoard, score })
  }
  

  const closeModal = () => {
    // Keep error message open as modal closes
    const id = setTimeout(() => {
      setShowError(false);
    }, 1000);
    setTimeoutId(id);
    onClose(); // close the modal
  };

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

  useEffect(() => {
    if (isSaveGameModalOpen) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [isSaveGameModalOpen]);

  return (
    <dialog id="save_game_modal" className="modal" open={isSaveGameModalOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-2xl text-center">Save Your Game?</h3>
        <p className="py-4 text-center">
          This will overrite any previous saved progress
        </p>
        <div className="flex justify-center gap-4 py-3">
          <button onClick={handleSave} className="btn" disabled={submitGameData.isPending}>
            {submitGameData.status === "pending" ? "Saving..." : "Save Game"}
          </button>
          <button onClick={closeModal} className="btn" disabled={submitGameData.isPending}>
            Cancel
          </button>
        </div>
      {showError && <p className="text-red-600 text-center my-3">Error: Unable to save game</p>}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>Close</button>
      </form>
    </dialog>
  );
};

export default SaveGameModal;