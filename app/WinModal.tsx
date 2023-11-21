import React from 'react'
import HighscoreSubmitForm from './components/HighscoreSubmitForm'
import ModalHighscoreDisplay from './components/ModalHighscoreDisplay'

interface Props {
  score: number
}

const WinModal = ({ score }: Props) => {
  return (
    <div className="text-white">
      <h1>Congratulations! You've reached 2048!</h1>
      <ModalHighscoreDisplay score={score} />
      <HighscoreSubmitForm score={score}/>
    </div>
  )
}

export default WinModal