import React from 'react'

interface Props {
    isModalOpen: boolean
}

const LoseModal = ({ isModalOpen }: Props) => {
  return (
    <div>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" checked={isModalOpen} readOnly/>
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
        </div>
        <label className="modal-backdrop">Close</label>
      </div>
    </div>
  )
}

export default LoseModal