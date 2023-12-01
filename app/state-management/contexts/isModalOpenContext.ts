import { Dispatch, SetStateAction, createContext } from "react";

interface isModalOpenContextType {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const isModalOpenContext = createContext<isModalOpenContextType>({} as isModalOpenContextType)

export default isModalOpenContext