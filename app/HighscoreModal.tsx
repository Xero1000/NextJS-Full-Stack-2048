import React, { useContext, useEffect } from "react";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import Spinner from "./Spinner";
import { useHighscores } from "./hooks/useHighscores";

interface Props {
  isHighscoreModalOpen: boolean;
  setIsHighscoreModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HighscoreModal = ({ isHighscoreModalOpen, setIsHighscoreModalOpen }: Props) => {
  const { data: highscores, error, isLoading, refetch } = useHighscores();

  const { setIsModalOpen } = useContext(isModalOpenContext);

  useEffect(() => {
    if (isHighscoreModalOpen) {
      setIsModalOpen(true);
      refetch(); // Refetch highscores when modal opens
    } else {
      setIsModalOpen(false);
    }
  }, [isHighscoreModalOpen, refetch]);

  return (
    <div>
      <dialog open={isHighscoreModalOpen} id="my_modal_2" className="modal">
        <div className="modal-box text-white">
          <h3 className="font-bold text-2xl text-center mb-5">Highscores</h3>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="mt-5 text-center py-2">
                <Spinner />
              </div>
            ) : error ? (
              <p className="text-center text-red-600">
                Error fetching highscores
              </p>
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
                  {highscores?.map((highscore, index) => (
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
          <button onClick={() => setIsHighscoreModalOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default HighscoreModal;
