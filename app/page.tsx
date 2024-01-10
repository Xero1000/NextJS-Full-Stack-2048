"use client";
import { Flex } from "@radix-ui/themes";
import EndGameModal from "./EndGameModal";
import GameBoard from "./GameBoard";
import Score from "./Score";

export default function Home() {
  return (
    <Flex
      align="center"
      direction="column"
      className="min-h-screen pt-24"
      gap="9"
    >
      <Score />
      <GameBoard />
      <EndGameModal />
    </Flex>
  );
}
