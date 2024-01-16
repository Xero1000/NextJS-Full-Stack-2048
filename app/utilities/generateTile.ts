// Generates a new tile in a random empty position on the board
const generateTile = (currentBoard: number[][]) => {
  
  // copy the current board to newBoard
  let newBoard = currentBoard.map((row) => [...row]);
  let emptySpaces: { rowIndex: number; colIndex: number }[] = [];

  // Each empty space is added to the array of emptySpaces
  newBoard.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 0) {
        emptySpaces.push({ rowIndex, colIndex });
      }
    });
  });

  // If there are empty spaces, a random space is chosen from the emptySpaces array
  // A value of either 2 or 4 is assigned to the chosen space
  // the space is removed from the array
  if (emptySpaces.length) {
    const emptySpaceIndex = Math.floor(Math.random() * emptySpaces.length);
    const { rowIndex, colIndex } = emptySpaces[emptySpaceIndex];
    newBoard[rowIndex][colIndex] = Math.random() > 0.1 ? 2 : 4; // 90% change tile will have a 2, 10% it'll be a 4
    emptySpaces.splice(emptySpaceIndex, 1) // Updated emptySpaces to remove the newly generated tile
  }

  return newBoard;
};

export default generateTile