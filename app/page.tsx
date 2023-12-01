"use client";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import GameBoard from "./GameBoard";
import LoseModal from "./LoseModal";
import ModalContainer from "./ModalContainer";
import Score from "./Score";
import WinModal from "./WinModal";
import ScoreProvider from "./state-management/providers/ScoreProvider";

export default function Home() {
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWin = () => {
    setWin(true);
    setIsModalOpen(true);
  };

  const handleLose = () => {
    setLose(true);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false)
  }

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
          onWin={handleWin}
          onLose={handleLose}
        />
        <ModalContainer isModalOpen={isModalOpen} onClose={onClose}>
          {win ? (
            <WinModal onClose={onClose}/>
          ) : lose ? (
            <LoseModal onClose={onClose}/>
          ) : null}
        </ModalContainer>
      </Flex>
    </ScoreProvider>
  );
}
