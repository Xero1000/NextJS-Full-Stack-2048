import { Dispatch, SetStateAction } from "react";

const checkWinLose = (newBoard: number[][], setIsModalOpen: Dispatch<SetStateAction<boolean>>, setWin: () => void, setLose: () => void) => {
  const win = checkWin(newBoard)
  const lose = checkLose(newBoard)

  if (win || lose) {
    if (win)
      setWin()
    else if (lose)
      setLose()
    setIsModalOpen(true)
  }
}

// Checks for the 2048 tile 
export const checkWin = (newBoard: number[][]) => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (newBoard[r][c] === 2048)
        return true
    }
  }
    
  return false;
}


// checks if there are any tiles containing a zero
// or any matching tiles the player can still merge
export const checkLose = (newBoard: number[][]) => { 
  for (let r = 0; r < 4; r++) {
    if (newBoard[r][0] === 0)
      return false
    for (let c = 0; c < 3; c++) {
      if (newBoard[r][c] === newBoard[r][c + 1] || newBoard[r][c + 1] === 0) {
        return false
      }
    }
  }

  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      if (newBoard[r][c] === newBoard[r + 1][c]) {
        return false
      }
    }
  }

  return true
}

export default checkWinLose