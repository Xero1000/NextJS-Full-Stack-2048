import HighscoreSubmitForm from './components/HighscoreSubmitForm'
import ModalHighscoreDisplay from './components/ModalHighscoreDisplay'

interface Props {
  onClose: () => void
}

const WinModal = ({ onClose }: Props) => {

  return (
    <div className="text-white">
      <h1>Congratulations! You&apos;ve reached 2048!</h1>
      <ModalHighscoreDisplay/>
      <HighscoreSubmitForm onClose={onClose}/>
    </div>
  )
}

export default WinModal