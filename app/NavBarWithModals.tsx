"use client";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import HighscoreModal from "./HighscoreModal";
import SaveGameModal from "./SaveGameModal";
import LoadGameModal from "./LoadGameModal";

const NavBarWithModals = () => {
  const [isHighscoreModalOpen, setIsHighscoreModalOpen] = useState(false);
  const [isSaveGameModalOpen, setIsSaveGameModalOpen] = useState(false)
  const [isLoadGameModalOpen, setIsLoadGameModalOpen] = useState(false)

  const handleOpenHighscoreModal = () => {
    setIsHighscoreModalOpen(true);
  };

  const handleCloseHighscoreModal = () => {
    setIsHighscoreModalOpen(false);
  };

  const handleOpenSaveGameModal = () => {
    setIsSaveGameModalOpen(true);
  };

  const handleCloseSaveGameModal = () => {
    setIsSaveGameModalOpen(false);
  };

  const handleOpenLoadGameModal = () => {
    setIsLoadGameModalOpen(true);
  };

  const handleCloseLoadGameModal = () => {
    setIsLoadGameModalOpen(false);
  };

  return (
    <>
      <NavBar onHighscoreClick={handleOpenHighscoreModal} onSaveClick={handleOpenSaveGameModal} onLoadClick={handleOpenLoadGameModal} />
      <HighscoreModal isHighscoreModalOpen={isHighscoreModalOpen} onClose={handleCloseHighscoreModal} />
      <SaveGameModal isSaveGameModalOpen={isSaveGameModalOpen} onClose={handleCloseSaveGameModal} />
      <LoadGameModal isLoadGameModalOpen={isLoadGameModalOpen} onClose={handleCloseLoadGameModal} />
    </>
  );
};

export default NavBarWithModals;
