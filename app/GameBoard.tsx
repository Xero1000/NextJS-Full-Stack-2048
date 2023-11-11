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
      for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
          if (newBoard[i][j] !== 0) {
            for (let k = j - 1; k >= 0; k--) {
              if (newBoard[i][k] === 0) {
                newBoard[i][k] = newBoard[i][k + 1];
                newBoard[i][k + 1] = 0;
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
          console.log("s");
          break;
        case "d":
          console.log("d");
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
