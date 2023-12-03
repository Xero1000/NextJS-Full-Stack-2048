import { Dispatch, SetStateAction, createContext } from "react";

interface restartGameContextType {
    restartGame: boolean;
    setRestartGame: Dispatch<SetStateAction<boolean>>
}

const restartGameContext = createContext<restartGameContextType>({} as restartGameContextType)

export default restartGameContext