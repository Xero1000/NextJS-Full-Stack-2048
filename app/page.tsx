"use client";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import GameBoard from "./GameBoard";
import LoseModal from "./LoseModal";
import ModalContainer from "./ModalContainer";
import Score from "./Score";
import WinModal from "./WinModal";

export default function Home() {
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateScore = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };

  const handleWin = () => {
    setWin(true);
    setIsModalOpen(true);
  };

  const handleLose = () => {
    setLose(true);
    setIsModalOpen(true);
  };

  return (
    <Flex
      align="center"
      direction="column"
      className="min-h-screen pt-24"
      gap="9"
    >
      <Score score={score} />
      <GameBoard
        onScoreChange={updateScore}
        onWin={handleWin}
        onLose={handleLose}
      />
      <ModalContainer isModalOpen={isModalOpen}>
        {win ? (
          <WinModal score={score} />
        ) : lose ? (
          <LoseModal score={score} />
        ) : null}
      </ModalContainer>
    </Flex>
  );
}
