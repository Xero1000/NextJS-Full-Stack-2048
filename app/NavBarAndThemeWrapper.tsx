"use client"
import React, { PropsWithChildren } from "react";
import IsModalOpenProvider from "./state-management/providers/IsModalOpenProvider";

const NavBarAndThemeWrapper = ({ children }: PropsWithChildren) => {
  return (
    <IsModalOpenProvider>
      {children}
    </IsModalOpenProvider>
  );
};

export default NavBarAndThemeWrapper;
