import React from 'react'

interface Props {
    score: number
}

const ModalHighscoreDisplay = ({ score }: Props) => {
  return (
    <h2>{`Final score: ${score}`}</h2>
  )
}

export default ModalHighscoreDisplay