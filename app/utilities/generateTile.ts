
const generateTile = (currentBoard: number[][]) => {
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
    }

    return newBoard;
  };

export default generateTile