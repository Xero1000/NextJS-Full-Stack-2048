"use client";
import { Grid } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import TileContainer from "./TileContainer";
import generateTile from "./utilities/generateTile";

const GameBoard = () => {
  const [boardData, setBoardData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // previous state of the board
  const [prevBoardData, setPrevBoardData] = useState(boardData)

  // variable to track if a move was made
  const [moveMade, setMoveMade] = useState(false)

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
        if (boardData[r][c] !== prevBoardData[r][c])
          return true
      }
    }
    return false
  }

  const moveLeft = () => {
    // use functional update to ensure the most current board
    // state is used
    setBoardData((currentBoard) => {
      setPrevBoardData(currentBoard) // save board state prior to change

      let newBoard = currentBoard.map((row) => [...row]);
      for (let r = 0; r < 4; r++) {
        for (let c = 1; c < 4; c++) {
          if (newBoard[r][c] !== 0) {
            for (let k = c - 1; k >= 0; k--) {
              if (newBoard[r][k] === 0) {
                newBoard[r][k] = newBoard[r][k + 1];
                newBoard[r][k + 1] = 0;
              } else if (newBoard[r][k] === newBoard[r][k + 1]) {
                newBoard[r][k] *= 2;
                newBoard[r][k + 1] = 0;
              }
            }
          }
        }
      }
      setMoveMade(true)
      return newBoard;
    });
  };

  const moveRight = () => {
    setBoardData((currentBoard) => {
      setPrevBoardData(currentBoard)
      let newBoard = currentBoard.map((row) => [...row]);
      for (let r = 0; r < 4; r++) {
        for (let c = 2; c >= 0; c--) {
          if (newBoard[r][c] !== 0) {
            for (let k = c + 1; k < 4; k++) {
              if (newBoard[r][k] === 0) {
                newBoard[r][k] = newBoard[r][k - 1];
                newBoard[r][k - 1] = 0;
              } else if (newBoard[r][k] === newBoard[r][k - 1]) {
                newBoard[r][k] *= 2;
                newBoard[r][k - 1] = 0;
              }
            }
          }
        }
      }
      setMoveMade(true)
      return newBoard;
    });
  };

  const moveDown = () => {
    setBoardData((currentBoard) => {
      setPrevBoardData(currentBoard)
      let newBoard = currentBoard.map((row) => [...row]);
      for (let c = 0; c < 4; c++) {
        for (let r = 2; r >= 0; r--) {
          if (newBoard[r][c] !== 0) {
            for (let k = r + 1; k < 4; k++) {
              if (newBoard[k][c] === 0) {
                newBoard[k][c] = newBoard[k - 1][c];
                newBoard[k - 1][c] = 0;
              } else if (newBoard[k][c] === newBoard[k - 1][c]) {
                newBoard[k][c] *= 2;
                newBoard[k - 1][c] = 0;
              }
            }
          }
        }
      }
      setMoveMade(true)
      return newBoard;
    });
  };

  const moveUp = () => {
    setBoardData((currentBoard) => {
      setPrevBoardData(currentBoard)
      let newBoard = currentBoard.map((row) => [...row]);
      for (let c = 0; c < 4; c++) {
        for (let r = 1; r < 4; r++) {
          if (newBoard[r][c] !== 0) {
            for (let k = r - 1; k >= 0; k--) {
              if (newBoard[k][c] === 0) {
                newBoard[k][c] = newBoard[k + 1][c];
                newBoard[k + 1][c] = 0;
              } else if (newBoard[k][c] === newBoard[k + 1][c]) {
                newBoard[k][c] *= 2;
                newBoard[k + 1][c] = 0;
              }
            }
          }
        }
      }
      setMoveMade(true)
      return newBoard;
    });
  };

  // board is initialized with two tiles upon startup
  useEffect(() => {
    initializeBoard();
  }, []);

  // 
  useEffect(() => {

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

    // event listener for keydown event
    window.addEventListener("keydown", handleKeyPress);

    // cleanup function to remove event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // When a move is made, if the board changed at all from the
  // previous board state, a new tile will be generated 
  // in an empty random tile.
  useEffect(() => {
    if (moveMade) {
      if (checkBoardChange()) {
        const newBoard = generateTile(boardData)
        setBoardData(newBoard)
      }
      setMoveMade(false)
    }
  }, [moveMade])

  return (
    <Grid
      columns="4"
      rows="4"
      className="border-2 border-black max-w-lg aspect-square w-10/12"
    >
      {boardData.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <TileContainer key={`${rowIndex}-${colIndex}`}>
            {col !== 0 && (
              <Tile value={col} position={[rowIndex, colIndex]} zIndex={10} />
            )}
          </TileContainer>
        ))
      )}
    </Grid>
  );
};

export default GameBoard;
