"use client";
import { Grid } from "@radix-ui/themes";
import React, { useState } from "react";
import Tile from "./Tile";
import TileContainer from "./TileContainer";

const GameBoard = () => {
  const [boardData, setBoardData] = useState([
    [0, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 0, 0],
  ]);

  return (
    <Grid
      columns="4"
      rows="4"
      className="border-2 border-black max-w-lg aspect-square w-10/12"
    >
      {boardData.map((row, rowIndex) => (
          row.map((col, colIndex) => (
            <TileContainer key={colIndex}>
              {col !== 0 && (
                <Tile value={col} position={[rowIndex, colIndex]} zIndex={10} />
              )}
            </TileContainer>
          ))
      ))}
    </Grid>
  );
};

export default GameBoard;
