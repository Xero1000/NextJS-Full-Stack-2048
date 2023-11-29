import HighscoreSubmitForm from './components/HighscoreSubmitForm'
import ModalHighscoreDisplay from './components/ModalHighscoreDisplay'

const LoseModal = () => {
  
  return (
    <div className="text-white">
      <h1>Sorry! You&apos;re out of moves!</h1>
      <ModalHighscoreDisplay />
      <HighscoreSubmitForm />
    </div>
  )
}

export default LoseModal