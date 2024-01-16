import { Dispatch, SetStateAction } from "react";

// Checks for the win or lose conditions
const checkWinLose = (newBoard: number[][], setWin: Dispatch<SetStateAction<boolean>>, setLose: Dispatch<SetStateAction<boolean>>) => {
  let win = false;
  let lose = true; // Assume loss until proven otherwise

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      // if 2048 tile is found, player wins 
      if (newBoard[r][c] === 2048) {
        win = true;
      }

      // if a possible move exists or there is a 0 tile, game continues
      if (newBoard[r][c] === 0 || 
          (c < 3 && newBoard[r][c] === newBoard[r][c + 1]) || 
          (r < 3 && newBoard[r][c] === newBoard[r + 1][c])) {
        lose = false;
      }
    }
  }

  // Set win or lose state
  if (win) {
    setWin(true);
  } else if (lose) {
    setLose(true);
  }
}

export default checkWinLose;
