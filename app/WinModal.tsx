import HighscoreSubmitForm from './components/HighscoreSubmitForm'
import ModalHighscoreDisplay from './components/ModalHighscoreDisplay'

const WinModal = () => {

  return (
    <div className="text-white">
      <h1>Congratulations! You&apos;ve reached 2048!</h1>
      <ModalHighscoreDisplay/>
      <HighscoreSubmitForm/>
    </div>
  )
}

export default WinModal