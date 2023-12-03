import React, { useContext, useEffect, useState } from "react";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import axios from "axios";
import Spinner from "./components/Spinner";

interface Props {
  isHighscoreModalOpen: boolean;
  onClose: () => void;
}

interface Highscore {
  id: number;
  name: string;
  score: number;
}

const HighscoreModal = ({ isHighscoreModalOpen, onClose }: Props) => {
  const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext);

  const [highscores, setHighscores] = useState<Highscore[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getHighscores = async () => {
      try {
        const response = await axios.get("/api/highscores");
        const data = response.data;
        setHighscores(data);
      } catch (error) {
        console.error("Error fetching highscores: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getHighscores();
  }, []);

  useEffect(() => {
    if (isHighscoreModalOpen) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [isHighscoreModalOpen]);

  return (
    <div>
      <dialog open={isHighscoreModalOpen} id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Highscores</h3>
          {isLoading ? (
            <Spinner />
          ) : (
            <ol>
              {highscores.map((highscore, index) => (
                <li
                  key={highscore.id}
                >{`${highscore.name}: ${highscore.score}`}</li>
              ))}
            </ol>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default HighscoreModal;
