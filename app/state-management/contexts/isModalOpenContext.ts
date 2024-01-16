import { Dispatch, SetStateAction, createContext } from "react";

// context for tracking if any of the several modals are open
// This is to ensure that when a modal is open, a player can't make
// any moves or implement any other outside actions. 
interface isModalOpenContextType {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const isModalOpenContext = createContext<isModalOpenContextType>({} as isModalOpenContextType)

export default isModalOpenContext