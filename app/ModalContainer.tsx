import React, { useContext } from 'react'
import isModalOpenContext from './state-management/contexts/isModalOpenContext'

interface Props {
    children: React.ReactNode
}

const ModalContainer = ({ children }: Props) => {
    const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext);

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
    <div className="text-white">
      <dialog open={ isModalOpen } id="my_modal_1" className="modal">
        <div className="modal-box">
          { children }
          <div className="modal-action">
            <form method="dialog">
              <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <button onClick={handleClose} className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default ModalContainer;
