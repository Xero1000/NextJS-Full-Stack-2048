'use client'
import { Button, Flex } from "@radix-ui/themes";
import Image from "next/image";
import GameBoard from "./GameBoard";
import Score from "./Score";
import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0)

  const updateScore = (points: number) => {
    setScore((prevScore) => prevScore + points)
  }

  return (
    <Flex
      align="center"
      direction="column"
      className="h-screen mt-24"
      gap="9"
    >
      <Score score={score}/>
      <GameBoard onScoreChange={updateScore}/>
    </Flex>
  );
}
