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

  const initializeBoard = () => {
    let newBoard = generateTile(boardData);
    newBoard = generateTile(newBoard);
    setBoardData(newBoard);
  };

  const moveLeft = () => {
    setBoardData((currentBoard) => {
      let newBoard = currentBoard.map((row) => [...row]);
      for (let r = 0; r < 4; r++) {
        for (let c = 1; c < 4; c++) {
          if (newBoard[r][c] !== 0) {
            for (let k = c - 1; k >= 0; k--) {
              if (newBoard[r][k] === 0) {
                newBoard[r][k] = newBoard[r][k + 1];
                newBoard[r][k + 1] = 0;
              }
              else if (newBoard[r][k] === newBoard[r][k + 1]) {
                newBoard[r][k] *= 2
                newBoard[r][k + 1] = 0
              }
            }
          }
        }
      }
      return newBoard
    })
  };

  const moveRight = () => {
    setBoardData((currentBoard) => {
      let newBoard = currentBoard.map((row) => [...row]);
      for (let r = 0; r < 4; r++) {
        for (let c = 2; c >= 0; c--) {
          if (newBoard[r][c] !== 0) {
            for (let k = c + 1; k < 4; k++) {
              if (newBoard[r][k] === 0) {
                newBoard[r][k] = newBoard[r][k - 1];
                newBoard[r][k - 1] = 0;
              }
              else if (newBoard[r][k] === newBoard[r][k - 1]) {
                newBoard[r][k] *= 2
                newBoard[r][k - 1] = 0
              }
            }
          }
        }
      }
      return newBoard
    })
  };

  const moveDown = () => {
    setBoardData((currentBoard) => {
      let newBoard = currentBoard.map((row) => [...row]);
      for (let c = 0; c < 4; c++) {
        for (let r = 2; r >= 0; r--) {
          if (newBoard[r][c] !== 0) {
            for (let k = r + 1; k < 4; k++) {
              if (newBoard[k][c] === 0) {
                newBoard[k][c] = newBoard[k - 1][c];
                newBoard[k - 1][c] = 0;
              }
              else if (newBoard[k][c] === newBoard[k - 1][c]) {
                newBoard[k][c] *= 2
                newBoard[k - 1][c] = 0
              }
            }
          }
        }
      }
      return newBoard
    })
  };

  

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          console.log("w");
          break;
        case "a":
          moveLeft();
          break;
        case "s":
          moveDown()
          break;
        case "d":
          moveRight()
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
