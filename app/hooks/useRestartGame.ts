import { useContext, useEffect } from "react";
import gameDataContext from "../state-management/contexts/gameDataContext";
import isModalOpenContext from "../state-management/contexts/isModalOpenContext";
import restartGameContext from "../state-management/contexts/restartGameContext";

// Run when user presses restart button
// Resets all state and context variables to initial values
const useRestartGame = (restartGame: boolean) => {
  const { setIsModalOpen } = useContext(isModalOpenContext);
  const { setScore, setBoardData, setGameOver, setWin, setLose } = useContext(gameDataContext);
  const { setRestartGame } = useContext(restartGameContext);

  useEffect(() => {
    if (restartGame) {
      setScore(0);
      setBoardData([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
      setWin(false)
      setLose(false)
      setIsModalOpen(false);
      setGameOver(false);
      setRestartGame(false);
    }
  }, [restartGame, 
      setBoardData, 
      setGameOver, 
      setIsModalOpen, 
      setLose, 
      setRestartGame, 
      setScore, 
      setWin]);
}

export default useRestartGame