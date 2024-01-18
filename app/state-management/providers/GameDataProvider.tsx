import React, { PropsWithChildren, useState } from "react";
import gameDataContext from "../contexts/gameDataContext";

const GameDataProvider = ({ children }: PropsWithChildren) => {
  const [boardData, setBoardData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  return (
    <gameDataContext.Provider
      value={{
        boardData,
        setBoardData,
        score,
        setScore,
        gameOver,
        setGameOver,
        win,
        setWin,
        lose,
        setLose,
      }}
    >
      {children}
    </gameDataContext.Provider>
  );
};

export default GameDataProvider;
