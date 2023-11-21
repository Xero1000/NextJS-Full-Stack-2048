import React from 'react'
import HighscoreSubmitForm from './components/HighscoreSubmitForm'

interface Props {
  score: number
}

const WinModal = ({ score }: Props) => {
  return (
    <div className="text-white">
      <h1>Congratulations! You've reached 2048!</h1>
      <h2>{`Final score: ${score}`}</h2>
      <HighscoreSubmitForm score={score}/>
    </div>
  )
}

export default WinModal