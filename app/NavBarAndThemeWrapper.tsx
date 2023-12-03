"use client";
import React, { PropsWithChildren } from "react";
import IsModalOpenProvider from "./state-management/providers/IsModalOpenProvider";
import RestartGameProvider from "./state-management/providers/restartGameProvider";

const NavBarAndThemeWrapper = ({ children }: PropsWithChildren) => {
  return (
    <RestartGameProvider>
      <IsModalOpenProvider>
        {children}
      </IsModalOpenProvider>
    </RestartGameProvider>
  );
};

export default NavBarAndThemeWrapper;
