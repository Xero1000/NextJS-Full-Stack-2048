import React, { useContext, useEffect } from "react";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";

interface Props {
  isLoadGameModalOpen: boolean;
  onClose: () => void;
}

const LoadGameModal = ({ isLoadGameModalOpen, onClose }: Props) => {
    const { setIsModalOpen } = useContext(isModalOpenContext);

    useEffect(() => {
      if (isLoadGameModalOpen) setIsModalOpen(true);
      else setIsModalOpen(false);
    }, [isLoadGameModalOpen]);
  
    return (
      <dialog id="load_game_modal" className="modal" open={isLoadGameModalOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center">Load Current Saved Game?</h3>
          <p className="py-4 text-center">
            This will overrite your current game progress
          </p>
          <div className="flex justify-center gap-4 py-3">
            <button className="btn">Load Game</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>Close</button>
        </form>
      </dialog>
    );
}

export default LoadGameModal