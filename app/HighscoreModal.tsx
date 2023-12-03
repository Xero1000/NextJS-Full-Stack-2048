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
  const { setIsModalOpen } = useContext(isModalOpenContext);

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
        <div className="modal-box text-white">
          <h3 className="font-bold text-2xl text-center mb-5">Highscores</h3>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="mt-5 text-center">
                <Spinner />
              </div>
            ) : (
              <table className="table table-zebra text-center">
                {/* head */}
                <thead>
                  <tr className="text-lg">
                    <th></th>
                    <th>Name</th>
                    <th>Highscore</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {highscores.map((highscore, index) => (
                    <tr key={highscore.id}>
                      <td>{index + 1}</td>
                      <td>{highscore.name}</td>
                      <td>{highscore.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default HighscoreModal;
