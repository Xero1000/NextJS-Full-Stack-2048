"use client";
import { Flex } from "@radix-ui/themes";
import { useContext } from "react";
import EndGameModal from "./EndGameModal";
import GameBoard from "./GameBoard";
import Score from "./Score";
import gameDataContext from "./state-management/contexts/gameDataContext";

export default function Home() {
  const { win, setWin } = useContext(gameDataContext)
  const { lose, setLose } = useContext(gameDataContext)

  const handleWin = () => {
    setWin(true);
  };

  const handleLose = () => {
    setLose(true);
  };

  const resetWinLose = () => {
    setWin(false);
    setLose(false);
  };

  return (
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
        resetWinLose={resetWinLose}
      />
      <EndGameModal win={win} lose={lose} />
    </Flex>
  );
}
