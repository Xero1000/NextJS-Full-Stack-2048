import { useEffect, useState } from "react";

const useCloseModalTimeout = (onClose: () => void, closeMessage: () => void) => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const closeModal = () => {
        // Keep error or no save message open as modal closes
        const id = setTimeout(() => {
          closeMessage();
        }, 1000);
        setTimeoutId(id);
        onClose(); // close the modal
      };
    
      // Cleanup function to clear the timeout
      // This is to prevent potential side effects if the component unmounts
      // before the timeout completes.
      useEffect(() => {
        return () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
      }, [timeoutId]);

    return closeModal
}

export default useCloseModalTimeout;