'use client'
import React, { useContext } from 'react'
import gameDataContext from './state-management/contexts/gameDataContext'

const EndGameRestartMessage = () => {
  const { gameOver } = useContext(gameDataContext)

  if (gameOver) {
      return (
        <h3 className='text-black'>Click Restart to start a new game</h3>
      )
  }
}

export default EndGameRestartMessage