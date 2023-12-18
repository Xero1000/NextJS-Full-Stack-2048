import { Dispatch, SetStateAction, createContext } from "react"

interface gameDataContextType {
    boardData: number[][]
    score: number
    gameOver: boolean
    setBoardData: Dispatch<SetStateAction<number[][]>>
    setScore: Dispatch<SetStateAction<number>>
    setGameOver: Dispatch<SetStateAction<boolean>>
}

const gameDataContext = createContext<gameDataContextType>({} as gameDataContextType)

export default gameDataContext