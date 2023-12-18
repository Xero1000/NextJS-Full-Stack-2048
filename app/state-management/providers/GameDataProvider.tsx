import React, { PropsWithChildren, useState } from "react";
import gameDataContext from "../contexts/gameDataContext";

const GameDataProvider = ({ children }: PropsWithChildren) => {
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
  const [score, setScore] = useState(0);

  return (
    <gameDataContext.Provider
      value={{ boardData, setBoardData, score, setScore, gameOver, setGameOver }}
    >
      {children}
    </gameDataContext.Provider>
  );
};

export default GameDataProvider;
