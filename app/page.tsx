"use client";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import GameBoard from "./GameBoard";
import LoseMessage from "./LoseMessage";
import EndGameModal from "./EndGameModal";
import Score from "./Score";
import WinMessage from "./WinMessage";
import ScoreProvider from "./state-management/providers/ScoreProvider";

export default function Home() {
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  const handleWin = () => {
    setWin(true);
  };

  const handleLose = () => {
    setLose(true);
  };

  return (
    <ScoreProvider>
      <Flex
        align="center"
        direction="column"
        className="min-h-screen pt-24"
        gap="9"
      >
        <Score />
        <GameBoard
          win={win}
          lose={lose}
          onWin={handleWin}
          onLose={handleLose}
        />
        <EndGameModal win={win} lose={lose} />
      </Flex>
    </ScoreProvider>
  );
}
