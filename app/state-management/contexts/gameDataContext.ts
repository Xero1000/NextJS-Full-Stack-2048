import { Dispatch, SetStateAction, createContext } from "react"

interface gameDataContextType {
    boardData: number[][]
    score: number
    setBoardData: Dispatch<SetStateAction<number[][]>>
    setScore: Dispatch<SetStateAction<number>>
}

const gameDataContext = createContext<gameDataContextType>({} as gameDataContextType)

export default gameDataContext