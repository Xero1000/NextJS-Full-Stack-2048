import { UseQueryResult } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import isModalOpenContext from "../state-management/contexts/isModalOpenContext";

// Sets isModalOpen to true or false depending on if any of the 
// several modals are open.
// The exception to this is the EndGameModal due to its uniqueness.
// Refetch is an optional parameter that is used only by loadGame and Highscore modals
const useIsModalOpen = (isConsumerModalOpen: boolean, refetch?: UseQueryResult['refetch']) => {
    const { setIsModalOpen } = useContext(isModalOpenContext)

    useEffect(() => {
      if (isConsumerModalOpen) {
        setIsModalOpen(true);
        if (refetch)
          refetch(); // Refetch data when modal opens
      } else {
        setIsModalOpen(false);
      }
    }, [isConsumerModalOpen, refetch, setIsModalOpen]);
}

export default useIsModalOpen;