
import { Metadata } from "next";
import EndGameModal from "./EndGameModal";
import GameBoard from "./GameBoard";
import Score from "./Score";
import EndGameRestartMessage from "./EndGameRestartMessage";

// The page the user sees showing player's score,
// the game board, and when the game is over, the 
// end game modal
export default function Home() {
  return (
    <div
      className="flex min-h-screen pt-24 items-center gap-9 flex-col bg-white"
    >
      <Score />
      <GameBoard />
      <EndGameRestartMessage />
      <EndGameModal />
    </div>
  );
}

// Metadata for search engines 
export const metadata: Metadata = {
  title: "Full Stack 2048",
  description: "Play the game 2048 with the ability to submit highscores and save and load game data."
}
