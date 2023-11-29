import React, { useContext } from 'react'
import scoreContext from '../state-management/contexts/scoreContext'

const ModalHighscoreDisplay = () => {
  const { score } = useContext(scoreContext)
  
  return (
    <h2>{`Final score: ${score}`}</h2>
  )
}

export default ModalHighscoreDisplay