"use client";
import React, { PropsWithChildren } from "react";
import IsModalOpenProvider from "./state-management/providers/IsModalOpenProvider";
import RestartGameProvider from "./state-management/providers/RestartGameProvider";
import GameDataProvider from "./state-management/providers/GameDataProvider";

// NavBar is wrapped by the providers
const NavBarAndThemeWrapper = ({ children }: PropsWithChildren) => {
  return (
    <GameDataProvider>
      <RestartGameProvider>
        <IsModalOpenProvider>{children}</IsModalOpenProvider>
      </RestartGameProvider>
    </GameDataProvider>
  );
};

export default NavBarAndThemeWrapper;
