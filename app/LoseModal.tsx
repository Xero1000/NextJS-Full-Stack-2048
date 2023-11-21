import React from 'react'
import HighscoreSubmitForm from './components/HighscoreSubmitForm'
import ModalHighscoreDisplay from './components/ModalHighscoreDisplay'

interface Props {
  score: number
}

const LoseModal = ({ score }: Props) => {
  return (
    <div className="text-white">
      <h1>Sorry! You're out of moves!</h1>
      <ModalHighscoreDisplay score={score} />
      <HighscoreSubmitForm score={score}/>
    </div>
  )
}

export default LoseModal