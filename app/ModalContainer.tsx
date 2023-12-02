import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HighscoreSubmitForm from "./components/HighscoreSubmitForm";
import ModalHighscoreDisplay from "./components/ModalHighscoreDisplay";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import scoreContext from "./state-management/contexts/scoreContext";

interface Props {
  children: React.ReactNode;
  win: boolean
  lose: boolean
}

const ModalContainer = ({ children, win, lose }: Props) => {
  const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext);
  const { score } = useContext(scoreContext);

  const [showSubmit, setShowSubmit] = useState(false);

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
        if (highscoreData.length < 10 || score > highscoreData[highscoreData.length - 1].score)
          setShowSubmit(true);
      } catch (error) {
        console.error("Error fetching highscores: ", error);
      }
    };

    if (win || lose)
      getHighscores();
  }, [win, lose]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="text-white">
      <dialog open={isModalOpen} id="my_modal_1" className="modal">
        <div className="modal-box">
          {children}
          <ModalHighscoreDisplay />
          { showSubmit && <HighscoreSubmitForm /> }
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

export default ModalContainer;
