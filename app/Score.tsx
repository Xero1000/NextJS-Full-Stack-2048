import React from "react";

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  return (
    <div className="border-2 border-black rounded-xl py-5 px-10 font-bold text-xl">
      Score: {score}
    </div>
  );
};

export default Score;
