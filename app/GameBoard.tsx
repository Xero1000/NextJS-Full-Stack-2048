import { useContext, useEffect, useState } from "react";
import Tile from "./Tile";
import TileContainer from "./TileContainer";
import useRestartGame from "./hooks/useRestartGame";
import gameDataContext from "./state-management/contexts/gameDataContext";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import restartGameContext from "./state-management/contexts/restartGameContext";
import checkWinLose from "./utilities/checkWinLose";
import generateTile from "./utilities/generateTile";

const GameBoard = () => {

  // CONTEXTS

  // Context for game data
  const { boardData, setBoardData, gameOver, setGameOver, setScore, win, setWin, lose, setLose } =
    useContext(gameDataContext);
   
  // Context for tracking if a modal is open
  const { isModalOpen } = useContext(isModalOpenContext);

  // Context for restarting the game
  const { restartGame } = useContext(restartGameContext);

  // STATES

  // New points to add to the score after each move made
  const [pointsToAdd, setPointsToAdd] = useState<number>(0);

  // previous state of the board
  const [prevBoardData, setPrevBoardData] = useState<number[][]>(boardData);

  // variable to track if a move was made
  const [moveMade, setMoveMade] = useState<boolean>(false);

  // FUNCTIONS

  // Runs generateTile twice on a new game
  const initializeBoard = () => {
    let newBoard = generateTile(boardData);
    newBoard = generateTile(newBoard);
    setBoardData(newBoard);
  };

  // checks if the board has changed as a result of a move made
  const checkBoardChange = () => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (boardData[r][c] !== prevBoardData[r][c]) return true;
      }
    }
    return false;
  };

  // Function for moving tiles left 
  // Tiles will move left until either reaching leftmost side 
  // or hitting another tile. 
  const moveLeft = () => {
    let pointsGained = 0;
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      // Create copy of the board 
      let newBoard = currentBoard.map((row) => [...row]);

      for (let r = 0; r < 4; r++) {
        let tilesWithMerge: number[] = [];
        for (let c = 1; c < 4; c++) {
          if (newBoard[r][c] !== 0) {
            if (newBoard[r][c - 1] === 0) {
              let k = c - 1;
              while (k >= 0 && newBoard[r][k] === 0) {
                newBoard[r][k] = newBoard[r][k + 1];
                newBoard[r][k + 1] = 0;
                k--;
              }
              if (
                k >= 0 &&
                newBoard[r][k] === newBoard[r][k + 1] &&
                !tilesWithMerge.includes(k)
              ) {
                newBoard[r][k] *= 2;
                newBoard[r][k + 1] = 0;
                pointsGained += newBoard[r][k];
                tilesWithMerge.push(k);
              }
            } else if (
              newBoard[r][c - 1] === newBoard[r][c] &&
              !tilesWithMerge.includes(c - 1)
            ) {
              newBoard[r][c - 1] *= 2;
              newBoard[r][c] = 0;
              pointsGained += newBoard[r][c - 1];
              tilesWithMerge.push(c - 1);
            }
          }
        }
      }
      return newBoard;
    });
    setPointsToAdd(pointsGained);
    setMoveMade(true);
  };

  // Function for moving tiles right 
  // Tiles will move right until either reaching rightmost side 
  // or hitting another tile.
  const moveRight = () => {
    let pointsGained = 0;
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      let newBoard = currentBoard.map((row) => [...row]);
      for (let r = 0; r < 4; r++) {
        let tilesWithMerge: number[] = [];
        for (let c = 2; c >= 0; c--) {
          if (newBoard[r][c] !== 0) {
            if (newBoard[r][c + 1] === 0) {
              let k = c + 1;
              while (k < 4 && newBoard[r][k] === 0) {
                newBoard[r][k] = newBoard[r][k - 1];
                newBoard[r][k - 1] = 0;
                k++;
              }
              if (
                k < 4 &&
                newBoard[r][k] === newBoard[r][k - 1] &&
                !tilesWithMerge.includes(k)
              ) {
                newBoard[r][k] *= 2;
                newBoard[r][k - 1] = 0;
                pointsGained += newBoard[r][k];
                tilesWithMerge.push(k);
              }
            } else if (
              newBoard[r][c + 1] === newBoard[r][c] &&
              !tilesWithMerge.includes(c + 1)
            ) {
              newBoard[r][c + 1] *= 2;
              newBoard[r][c] = 0;
              pointsGained += newBoard[r][c + 1];
              tilesWithMerge.push(c + 1);
            }
          }
        }
      }
      return newBoard;
    });
    setPointsToAdd(pointsGained);
    setMoveMade(true);
  };

  // Function for moving tiles down 
  // Tiles will move down until either reaching the bottom 
  // or hitting another tile.
  const moveDown = () => {
    let pointsGained = 0;
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      let newBoard = currentBoard.map((row) => [...row]);
      for (let c = 0; c < 4; c++) {
        let tilesWithMerge: number[] = [];
        for (let r = 2; r >= 0; r--) {
          if (newBoard[r][c] !== 0) {
            if (newBoard[r + 1][c] === 0) {
              let k = r + 1;
              while (k < 4 && newBoard[k][c] === 0) {
                newBoard[k][c] = newBoard[k - 1][c];
                newBoard[k - 1][c] = 0;
                k++;
              }
              if (
                k < 4 &&
                newBoard[k][c] === newBoard[k - 1][c] &&
                !tilesWithMerge.includes(k)
              ) {
                newBoard[k][c] *= 2;
                newBoard[k - 1][c] = 0;
                pointsGained += newBoard[k][c];
                tilesWithMerge.push(k);
              }
            } else if (
              newBoard[r + 1][c] === newBoard[r][c] &&
              !tilesWithMerge.includes(r + 1)
            ) {
              newBoard[r + 1][c] *= 2;
              newBoard[r][c] = 0;
              pointsGained += newBoard[r + 1][c];
              tilesWithMerge.push(r + 1);
            }
          }
        }
      }
      return newBoard;
    });
    setPointsToAdd(pointsGained);
    setMoveMade(true);
  };

  // Function for moving tiles down 
  // Tiles will move down until either reaching the top 
  // or hitting another tile.
  const moveUp = () => {
    let pointsGained = 0;
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      let newBoard = currentBoard.map((row) => [...row]);
      for (let c = 0; c < 4; c++) {
        let tilesWithMerge: number[] = [];
        for (let r = 1; r < 4; r++) {
          if (newBoard[r][c] !== 0) {
            if (newBoard[r - 1][c] === 0) {
              let k = r - 1;
              while (k >= 0 && newBoard[k][c] === 0) {
                newBoard[k][c] = newBoard[k + 1][c];
                newBoard[k + 1][c] = 0;
                k--;
              }
              if (
                k >= 0 &&
                newBoard[k][c] === newBoard[k + 1][c] &&
                !tilesWithMerge.includes(k)
              ) {
                newBoard[k][c] *= 2;
                newBoard[k + 1][c] = 0;
                pointsGained += newBoard[k][c];
                tilesWithMerge.push(k);
              }
            } else if (
              newBoard[r - 1][c] === newBoard[r][c] &&
              !tilesWithMerge.includes(r - 1)
            ) {
              newBoard[r - 1][c] *= 2;
              newBoard[r][c] = 0;
              pointsGained += newBoard[r - 1][c];
              tilesWithMerge.push(r - 1);
            }
          }
        }
      }
      return newBoard;
    });
    setPointsToAdd(pointsGained);
    setMoveMade(true);
  };

  // When the player presses w, a, s, or d keys, one of 
  // the move functions will be called depending on the key
  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "w": // pressing 'w' will move tiles up
        moveUp();
        break;
      case "a": // pressing 'a' will move tiles left
        moveLeft();
        break;
      case "s": // pressing 's' will move tiles down
        moveDown();
        break;
      case "d": // pressing 'd' will move tiles right
        moveRight();
        break;
      default:
        break;
    }
  };

  // EFFECTS

  // Save board state prior to each move
  useEffect(() => {
    setPrevBoardData(boardData); // save board state prior to each move
  }, [boardData]);

  // Custom hook for starting a new game
  useRestartGame(restartGame)

  // Calls initializeBoard if every tile is 0
  // Run when page is loaded and when user presses restart button
  useEffect(() => {
    if (boardData.every((row) => row.every((cell) => cell === 0))) {
      initializeBoard();
    }
  }, [boardData]);

  // If tiles merge, the new points will be
  // added to the overall score
  useEffect(() => {
    setScore((prevScore) => prevScore + pointsToAdd);
    setPointsToAdd(0);
  }, [pointsToAdd]);

  // If no modal is currently open and the game is not over, 
  // the move keys will be enabled. 
  useEffect(() => {
    if (!isModalOpen && !gameOver) {
      // event listener for keydown event
      window.addEventListener("keydown", handleKeyPress);

      // cleanup function to remove event listener
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [isModalOpen, gameOver, handleKeyPress]);

  // disables keyboard events upon player
  // winning or losing
  useEffect(() => {
    if (win || lose) setGameOver(true);
  }, [win, lose]);

  // When a move key is pressed, if the board changed at all from the
  // previous board state, a new tile will be generated
  // in an empty random tile.
  useEffect(() => {
    if (moveMade) {
      if (checkBoardChange()) {
        const newBoard = generateTile(boardData);
        setBoardData(newBoard);
        checkWinLose(newBoard, setWin, setLose);
      }
      setMoveMade(false);
    }
  }, [moveMade]);

  return (
    <div
      className="grid grid-cols-4 border-2 border-black max-w-lg aspect-square w-10/12"
    >
      {boardData.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <TileContainer key={`${rowIndex}-${colIndex}`}>
            {col !== 0 && <Tile value={col} />}
          </TileContainer>
        ))
      )}
    </div>
  );
};

export default GameBoard;
