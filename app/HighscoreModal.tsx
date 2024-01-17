import React from "react";
import Spinner from "./Spinner";
import { useHighscores } from "./hooks/useHighscores";
import useIsModalOpen from "./hooks/useIsModalOpen";

interface Props {
  isHighscoreModalOpen: boolean;
  setIsHighscoreModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Modal that displays the current highscores
const HighscoreModal = ({
  isHighscoreModalOpen,
  setIsHighscoreModalOpen,
}: Props) => {

  // Custom hook for fetching highscores
  const { data: highscores, error, isLoading, refetch } = useHighscores();

  // Custom hook for telling the game a modal is open and for
  // refetching the highscores. 
  useIsModalOpen(isHighscoreModalOpen, refetch);

  return (
    <dialog open={isHighscoreModalOpen} id="highscore_modal" className="modal">
      <div className="modal-box text-white mt-14">
        <h3 className="font-bold text-2xl text-center mb-5">Highscores</h3>
        {/* A spinner for if highscores are being fetched,
            An error message if highscores can't be fetched,
            A table showing the highscores if they are successfully fetched */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="mt-5 text-center py-2">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-center text-red">
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
        {/* Message to tell player to click outside modal to close it */}
        <p className="text-center pt-6">(Click outside to close)</p>
      </div>
      {/* Close the highscore modal */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsHighscoreModalOpen(false)}>close</button>
      </form>
    </dialog>
  );
};

export default HighscoreModal;
