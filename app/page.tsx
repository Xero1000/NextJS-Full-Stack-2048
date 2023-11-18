'use client'
import { Button, Flex } from "@radix-ui/themes";
import Image from "next/image";
import GameBoard from "./GameBoard";
import Score from "./Score";
import { useEffect, useState } from "react";
import WinModal from "./WinModal";
import LoseModal from "./LoseModal";

export default function Home() {
  const [score, setScore] = useState(0)
  const updateScore = (points: number) => {
    setScore((prevScore) => prevScore + points)
  }

  // state to track if player has made 2048 tile
  const [win, setWin] = useState(false)
  const handleWin = () => {
    setWin(true)
  }

  // Runs when player finds 2048 tile
  useEffect(() => {
    if (win) {
      console.log("Won the game")
    }
  }, [win])

  // state to track if player has run out of moves
  const [lose, setLose] = useState(false)
  const handleLose = () => {
    setLose(true)
  }

  // Runs when player runs out of moves
  useEffect(() => {
    if (lose) {
      console.log("No moves left");
    }
  }, [lose]);

  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <Flex
      align="center"
      direction="column"
      className="min-h-screen pt-24"
      gap="9"
    >
      <Score score={score}/>
      <GameBoard onScoreChange={updateScore} onWin={handleWin} onLose={handleLose}/>
      { isModalOpen && win && <WinModal isModalOpen={isModalOpen}/>}
      { isModalOpen && lose && <LoseModal isModalOpen={isModalOpen}/>}
    </Flex>
  );
}
