import React, { useContext } from "react";
import gameDataContext from "./state-management/contexts/gameDataContext";

const Score = () => {
  const { score } = useContext(gameDataContext)

  return (
    <div className="border-2 border-black rounded-xl py-5 px-10 font-bold text-xl">
      Score: {score}
    </div>
  );
};

export default Score;
