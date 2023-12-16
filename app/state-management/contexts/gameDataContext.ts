import { Dispatch, SetStateAction, createContext } from "react"

interface gameDataContextType {
    boardData: number[][]
    gameOver: boolean
    score: number
    setBoardData: Dispatch<SetStateAction<number[][]>>
    setGameOver: Dispatch<SetStateAction<boolean>>
    setScore: Dispatch<SetStateAction<number>>
}

const gameDataContext = createContext<gameDataContextType>({} as gameDataContextType)

export default gameDataContext