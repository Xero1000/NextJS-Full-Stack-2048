import React from 'react'

interface Props {
  score: number
}

const LoseModal = ({ score }: Props) => {
  return (
    <div className="text-white">
      <h1>Sorry! You're out of moves!</h1>
      <h3>{`Final score: ${score}`}</h3>
    </div>
  )
}

export default LoseModal