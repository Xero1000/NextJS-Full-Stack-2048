import React, { useContext, useEffect } from "react";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";

interface Props {
  isSaveGameModalOpen: boolean;
  onClose: () => void;
}

const SaveGameModal = ({ isSaveGameModalOpen, onClose }: Props) => {
  const { setIsModalOpen } = useContext(isModalOpenContext);

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
          <button className="btn">Save Game</button>
          <button onClick={onClose} className="btn">Cancel</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>Close</button>
      </form>
    </dialog>
  );
};

export default SaveGameModal;
