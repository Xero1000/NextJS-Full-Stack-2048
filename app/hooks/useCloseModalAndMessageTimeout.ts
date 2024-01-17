import { useState } from "react";
import useClearTimeout from "./useClearTimeout";

// If an error message is displayed on a modal when it closes, 
// the message will remain open until the modal is completely closed
const useCloseModalAndMessageTimeout = (onClose: React.Dispatch<React.SetStateAction<boolean>>, closeMessage: React.Dispatch<React.SetStateAction<boolean>>) => {  
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const closeModalMessage = () => {
        // message will vanish after 1 second
        const id = setTimeout(() => {
          closeMessage(false);
        }, 1000);
        setTimeoutId(id);
        onClose(false); // close the modal
      };
    
      // Cleanup function 
      useClearTimeout(timeoutId);

    return closeModalMessage
}

export default useCloseModalAndMessageTimeout;