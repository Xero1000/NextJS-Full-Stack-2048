"use client";
import { Box, Grid } from "@radix-ui/themes";
import React, { useState } from "react";
import EmptyTile from "./EmptyTile";
import Tile from "./Tile";

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
            <Box key={colIndex} className="relative" width="100%" height="100%">
              <EmptyTile />
              {col !== 0 && (
                <Tile value={col} position={[rowIndex, colIndex]} zIndex={10} />
              )}
            </Box>
          ))
      ))}
    </Grid>
  );
};

export default GameBoard;
