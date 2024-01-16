import { useEffect, useState } from "react";

const useCloseModalTimeout = (onClose: React.Dispatch<React.SetStateAction<boolean>>, closeMessage: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const closeModal = () => {
        // Keep error or no save message open as modal closes
        const id = setTimeout(() => {
          closeMessage(false);
        }, 1000);
        setTimeoutId(id);
        onClose(false); // close the modal
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