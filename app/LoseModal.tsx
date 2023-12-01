import HighscoreSubmitForm from './components/HighscoreSubmitForm'
import ModalHighscoreDisplay from './components/ModalHighscoreDisplay'

interface Props {
  onClose: () => void
}

const LoseModal = ({ onClose }: Props) => {
  
  return (
    <div className="text-white">
      <h1>Sorry! You&apos;re out of moves!</h1>
      <ModalHighscoreDisplay />
      <HighscoreSubmitForm onClose={onClose}/>
    </div>
  )
}

export default LoseModal