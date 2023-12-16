"use client";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import HighscoreModal from "./HighscoreModal";
import SaveGameModal from "./SaveGameModal";

const NavBarWithModals = () => {
  const [isHighscoreModalOpen, setIsHighscoreModalOpen] = useState(false);
  const [isSaveGameModalOpen, setIsSaveGameModalOpen] = useState(false)

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

  return (
    <>
      <NavBar onHighscoreClick={handleOpenHighscoreModal} onSaveClick={handleOpenSaveGameModal} />
      <HighscoreModal isHighscoreModalOpen={isHighscoreModalOpen} onClose={handleCloseHighscoreModal} />
      <SaveGameModal isSaveGameModalOpen={isSaveGameModalOpen} onClose={handleCloseSaveGameModal} />
    </>
  );
};

export default NavBarWithModals;
