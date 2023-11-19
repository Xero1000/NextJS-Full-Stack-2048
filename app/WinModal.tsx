import React from 'react'

interface Props {
  score: number
}

const WinModal = ({ score }: Props) => {
  return (
    <div className="text-white">
      <h1>Congratulations! You've reached 2048!</h1>
      <h3>{`Final score: ${score}`}</h3>
    </div>
  )
}

export default WinModal