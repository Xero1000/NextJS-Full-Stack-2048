import { useEffect, useState } from "react";

// If an error message is displayed on a modal when it closes, 
// the message will remain open until the modal is completely closed
const useCloseModalMessageTimeout = (onClose: React.Dispatch<React.SetStateAction<boolean>>, closeMessage: React.Dispatch<React.SetStateAction<boolean>>) => {  
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const closeModalMessage = () => {
        // message will vanish after 1 second
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

    return closeModalMessage
}

export default useCloseModalMessageTimeout;