import { Grid } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import Tile from "./Tile";
import TileContainer from "./TileContainer";
import scoreContext from "./state-management/contexts/scoreContext";
import generateTile from "./utilities/generateTile";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import restartGameContext from "./state-management/contexts/restartGameContext";

interface Props {
  win: boolean;
  lose: boolean;
  onWin: () => void;
  onLose: () => void;
  resetWinLose: () => void;
}

const GameBoard = ({ win, lose, onWin, onLose, resetWinLose }: Props) => {
  const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext);
  const { setScore } = useContext(scoreContext);
  const { restartGame, setRestartGame } = useContext(restartGameContext);

  const [boardData, setBoardData] = useState([
    // [1, 2, 1, 2],
    // [2, 1, 2, 1],
    // [3, 5, 3, 5],
    // [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [gameOver, setGameOver] = useState(false);

  const [pointsToAdd, setPointsToAdd] = useState(0);

  // previous state of the board
  const [prevBoardData, setPrevBoardData] = useState(boardData);

  // variable to track if a move was made
  const [moveMade, setMoveMade] = useState(false);

  // Runs generateTile twice upon startup
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

  const moveLeft = () => {
    let pointsGained = 0;
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      setPrevBoardData(currentBoard); // save board state prior to change
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
                newBoard[r][k] = 2048;
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
      setPointsToAdd(pointsGained);
      setMoveMade(true);
      return newBoard;
    });
  };

  const moveRight = () => {
    let pointsGained = 0;
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      setPrevBoardData(currentBoard); // save board state prior to change
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
      setPointsToAdd(pointsGained);
      setMoveMade(true);
      return newBoard;
    });
  };

  const moveDown = () => {
    let pointsGained = 0;
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      setPrevBoardData(currentBoard); // save board state prior to change
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
      setPointsToAdd(pointsGained);
      setMoveMade(true);
      return newBoard;
    });
  };

  const moveUp = () => {
    let pointsGained = 0;
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      setPrevBoardData(currentBoard); // save board state prior to change
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
      setPointsToAdd(pointsGained);
      setMoveMade(true);
      return newBoard;
    });
  };

  // // board is initialized with two tiles upon startup
  // useEffect(() => {
  //   initializeBoard();
  // }, []);

  // the following two effect hooks work together
  // the first one resets the board data
  useEffect(() => {
    if (restartGame) {
      setScore(0);
      setBoardData([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
      resetWinLose()
      setIsModalOpen(false)
      setGameOver(false)
      setRestartGame(false);
    }
  }, [restartGame]);

  // this second effect calls initializeBoard if every tile is 0
  useEffect(() => {
    if (boardData.every(row => row.every(cell => cell === 0))) {
      initializeBoard()
    }
  }, [boardData])

  // If tiles merge, the new points will be
  // added to the overall score
  useEffect(() => {
    setScore((prevScore) => prevScore + pointsToAdd);
    setPointsToAdd(0);
  }, [pointsToAdd]);

  //
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

  useEffect(() => {
    if (!isModalOpen && !gameOver) {
      // event listener for keydown event
      window.addEventListener("keydown", handleKeyPress);

      // cleanup function to remove event listener
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [isModalOpen]);

  // disables keyboard events upon player
  // winning or losing
  useEffect(() => {
    if (win || lose) setGameOver(true);
  }, [win, lose]);

  // When a move is made, if the board changed at all from the
  // previous board state, a new tile will be generated
  // in an empty random tile.
  useEffect(() => {
    if (moveMade) {
      if (checkBoardChange()) {
        const newBoard = generateTile(boardData, setIsModalOpen, onLose);
        setBoardData(newBoard);
      }
      setMoveMade(false);
    }
  }, [moveMade]);

  return (
    <Grid
      columns="4"
      rows="4"
      className="border-2 border-black max-w-lg aspect-square w-10/12"
    >
      {boardData.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <TileContainer key={`${rowIndex}-${colIndex}`}>
            {col !== 0 && <Tile value={col} onWin={onWin} />}
          </TileContainer>
        ))
      )}
    </Grid>
  );
};

export default GameBoard;
