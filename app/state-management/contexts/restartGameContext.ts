import { Dispatch, SetStateAction, createContext } from "react";

// Context to track when player clicks the restart button
interface restartGameContextType {
    restartGame: boolean;
    setRestartGame: Dispatch<SetStateAction<boolean>>
}

const restartGameContext = createContext<restartGameContextType>({} as restartGameContextType)

export default restartGameContext