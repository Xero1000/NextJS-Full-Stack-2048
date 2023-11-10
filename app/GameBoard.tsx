"use client";
import { Box, Grid } from "@radix-ui/themes";
import React, { useState } from "react";
import EmptyTile from "./EmptyTile";

const GameBoard = () => {
  const [boardData, setBoardData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  return (
    <Grid columns="4" rows="4" className="border-2 border-black max-w-lg aspect-square w-10/12">
      {boardData.map((row, rowIndex) => (
        <Box key={rowIndex}>
          {row.map((col, colIndex) => (
              <EmptyTile key={colIndex}/>
          ))}
        </Box>
      ))}
    </Grid>
  );
};

export default GameBoard;
