import React from 'react'
import HighscoreSubmitForm from './components/HighscoreSubmitForm'

interface Props {
  score: number
}

const LoseModal = ({ score }: Props) => {
  return (
    <div className="text-white">
      <h1>Sorry! You're out of moves!</h1>
      <h2>{`Final score: ${score}`}</h2>
      <HighscoreSubmitForm score={score}/>
    </div>
  )
}

export default LoseModal