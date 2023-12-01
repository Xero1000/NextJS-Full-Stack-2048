import React, { PropsWithChildren, useState } from "react";
import isModalOpenContext from "../contexts/isModalOpenContext";

const IsModalOpenProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </isModalOpenContext.Provider>
  );
};

export default IsModalOpenProvider;
