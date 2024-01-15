"use client";
import React, { useState } from "react";
import NavBar from "./NavBar";
import HighscoreModal from "./HighscoreModal";
import SaveGameModal from "./SaveGameModal";
import LoadGameModal from "./LoadGameModal";
import InstructionsModal from "./InstructionsModal";

const NavBarWithModals = () => {
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState<boolean>(false)
  const [isHighscoreModalOpen, setIsHighscoreModalOpen] = useState<boolean>(false);
  const [isSaveGameModalOpen, setIsSaveGameModalOpen] = useState<boolean>(false)
  const [isLoadGameModalOpen, setIsLoadGameModalOpen] = useState<boolean>(false)

  return (
    <>
      <NavBar setIsInstructionsModalOpen={setIsInstructionsModalOpen} setIsHighScoreModalOpen={setIsHighscoreModalOpen} setIsSaveGameModalOpen={setIsSaveGameModalOpen} setIsLoadGameModalOpen={setIsLoadGameModalOpen} />
      <InstructionsModal isInstructionsModalOpen={isInstructionsModalOpen} setIsInstructionsModalOpen={setIsInstructionsModalOpen} />
      <HighscoreModal isHighscoreModalOpen={isHighscoreModalOpen} setIsHighscoreModalOpen={setIsHighscoreModalOpen} />
      <SaveGameModal isSaveGameModalOpen={isSaveGameModalOpen} setIsSaveGameModalOpen={setIsSaveGameModalOpen} />
      <LoadGameModal isLoadGameModalOpen={isLoadGameModalOpen} setIsLoadGameModalOpen={setIsLoadGameModalOpen} />
    </>
  );
};

export default NavBarWithModals;
