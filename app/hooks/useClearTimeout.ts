import { useEffect } from "react";

// Cleanup function to clear the timeout
// This is to prevent potential side effects if the component unmounts
// before the timeout completes.
const useClearTimeout = (timeoutId: NodeJS.Timeout | null) => {
    useEffect(() => {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [timeoutId]);
}

export default useClearTimeout