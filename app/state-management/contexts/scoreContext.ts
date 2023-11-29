import { Dispatch, SetStateAction, createContext } from "react"

interface ScoreContextType {
    score: number
    setScore: Dispatch<SetStateAction<number>>
}

const scoreContext = createContext<ScoreContextType>({} as ScoreContextType)

export default scoreContext