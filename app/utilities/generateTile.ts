import { Dispatch, SetStateAction } from "react";

const generateTile = (currentBoard: number[][], setIsModalOpen?: Dispatch<SetStateAction<boolean>>, setLose?: Dispatch<SetStateAction<boolean>>) => {
  
    let newBoard = currentBoard.map((row) => [...row]);
    let emptySpaces: { rowIndex: number; colIndex: number }[] = [];

    newBoard.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value === 0) {
          emptySpaces.push({ rowIndex, colIndex });
        }
      });
    });
    if (emptySpaces.length) {
      const emptySpaceIndex = Math.floor(Math.random() * emptySpaces.length);
      const { rowIndex, colIndex } = emptySpaces[emptySpaceIndex];
      newBoard[rowIndex][colIndex] = Math.random() > 0.1 ? 2 : 4; // 90% change tile will have a 2, 10% it'll be a 4
      emptySpaces.splice(emptySpaceIndex, 1) // Updated emptySpaces to remove the newly generated tile
    }

    if (setLose && setIsModalOpen && !emptySpaces.length && checkLose(newBoard)) {
      setLose(true)
      setIsModalOpen(true)
    }
    return newBoard;
  };

// Helper function to generateTile
// Runs when there are no empty tiles left
// checks if there are any matching tiles the player can still merge
const checkLose = (newBoard: number[][]) => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if (newBoard[r][c] === newBoard[r][c + 1]) {
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

export default generateTile