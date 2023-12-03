import React, { PropsWithChildren, useState } from "react";
import RestartGameContext from "../contexts/restartGameContext";

const RestartGameProvider = ({ children }: PropsWithChildren) => {
  const [restartGame, setRestartGame] = useState(false);
  return (
    <RestartGameContext.Provider value={{ restartGame, setRestartGame }}>
      {children}
    </RestartGameContext.Provider>
  );
};

export default RestartGameProvider;
