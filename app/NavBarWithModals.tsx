"use client";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import HighscoreModal from "./HighscoreModal";

const NavBarWithModals = () => {
  const [isHighscoreModalOpen, setIsHighscoreModalOpen] = useState(false);

  const handleOpenHighscoreModal = () => {
    setIsHighscoreModalOpen(true);
  };

  const handleCloseHighscoreModal = () => {
    setIsHighscoreModalOpen(false);
  };

  return (
    <>
      <NavBar onHighscoreClick={handleOpenHighscoreModal} />
      <HighscoreModal isHighscoreModalOpen={isHighscoreModalOpen} onClose={handleCloseHighscoreModal} />
    </>
  );
};

export default NavBarWithModals;
