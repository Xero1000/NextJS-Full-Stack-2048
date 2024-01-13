"use client";
import EndGameModal from "./EndGameModal";
import GameBoard from "./GameBoard";
import Score from "./Score";

export default function Home() {
  return (
    <div
      className="flex min-h-screen pt-24 items-center gap-9 flex-col bg-white"
    >
      <Score />
      <GameBoard />
      <EndGameModal />
    </div>
  );
}
