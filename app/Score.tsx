'use client';

import React, { useContext } from "react";
import gameDataContext from "./state-management/contexts/gameDataContext";

// Score display for the game 
const Score = () => {
  // context for game data
  const { score } = useContext(gameDataContext)

  return (
    <div className="border-2 border-black rounded-xl text-black py-5 px-10 font-bold text-xl">
      Score: {score}
    </div>
  );
};

export default Score;
