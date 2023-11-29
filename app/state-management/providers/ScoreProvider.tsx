import React, { PropsWithChildren, useState } from 'react'
import ScoreContext from '../contexts/scoreContext';

const ScoreProvider = ({ children }: PropsWithChildren) => {
    const [score, setScore] = useState(0);

  return (
    <ScoreContext.Provider value={{score, setScore}}>
        {children}
    </ScoreContext.Provider>
  )
}

export default ScoreProvider