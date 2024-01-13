"use client";
import React, { useState } from "react";
import NavBar from "./NavBar";
import HighscoreModal from "./HighscoreModal";
import SaveGameModal from "./SaveGameModal";
import LoadGameModal from "./LoadGameModal";

const NavBarWithModals = () => {
  const [isHighscoreModalOpen, setIsHighscoreModalOpen] = useState<boolean>(false);
  const [isSaveGameModalOpen, setIsSaveGameModalOpen] = useState<boolean>(false)
  const [isLoadGameModalOpen, setIsLoadGameModalOpen] = useState<boolean>(false)

  return (
    <>
      <NavBar setIsHighScoreModalOpen={setIsHighscoreModalOpen} setIsSaveGameModalOpen={setIsSaveGameModalOpen} setIsLoadGameModalOpen={setIsLoadGameModalOpen} />
      <HighscoreModal isHighscoreModalOpen={isHighscoreModalOpen} setIsHighscoreModalOpen={setIsHighscoreModalOpen} />
      <SaveGameModal isSaveGameModalOpen={isSaveGameModalOpen} setIsSaveGameModalOpen={setIsSaveGameModalOpen} />
      <LoadGameModal isLoadGameModalOpen={isLoadGameModalOpen} setIsLoadGameModalOpen={setIsLoadGameModalOpen} />
    </>
  );
};

export default NavBarWithModals;
