"use client";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import GameBoard from "./GameBoard";
import LoseMessage from "./LoseMessage";
import ModalContainer from "./ModalContainer";
import Score from "./Score";
import WinMessage from "./WinMessage";
import ScoreProvider from "./state-management/providers/ScoreProvider";
import IsModalOpenProvider from "./state-management/providers/IsModalOpenProvider";

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
    <IsModalOpenProvider>
      <ScoreProvider>
        <Flex
          align="center"
          direction="column"
          className="min-h-screen pt-24"
          gap="9"
        >
          <Score />
          <GameBoard onWin={handleWin} onLose={handleLose} />
          <ModalContainer win={win} lose={lose}>
            {win ? <WinMessage /> : lose ? <LoseMessage /> : null}
          </ModalContainer>
        </Flex>
      </ScoreProvider>
    </IsModalOpenProvider>
  );
}
