import React, { useContext } from "react";
import scoreContext from "./state-management/contexts/scoreContext";

const Score = () => {
  const { score } = useContext(scoreContext)

  return (
    <div className="border-2 border-black rounded-xl py-5 px-10 font-bold text-xl">
      Score: {score}
    </div>
  );
};

export default Score;
