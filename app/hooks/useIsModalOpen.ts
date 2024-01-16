import { UseQueryResult } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import isModalOpenContext from "../state-management/contexts/isModalOpenContext";

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
    }, [isConsumerModalOpen, refetch]);
}

export default useIsModalOpen;