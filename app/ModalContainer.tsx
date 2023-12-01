import React, { useContext, useEffect } from 'react'
import isModalOpenContext from './state-management/contexts/isModalOpenContext'

interface Props {
    children: React.ReactNode
}

const ModalContainer = ({ children }: Props) => {
    const { isModalOpen, setIsModalOpen} = useContext(isModalOpenContext)  

    // The modal will open when the player wins or loses
    useEffect(() => {
        // if statement keeps modal from opening upon page load up
        if (isModalOpen) {
            const dialogElement = document.getElementById("my_modal_1") as HTMLDialogElement
            dialogElement.show()
        }
    }, [isModalOpen])

    useEffect(() => {
      if (!isModalOpen) {
        setIsModalOpen(false)
      }
    }, [isModalOpen])

    return (
    <div className="text-white">
      <dialog open={ isModalOpen } id="my_modal_1" className="modal">
        <div className="modal-box">
          {/* Content depends on if player won or lost */}
          { children }
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default ModalContainer