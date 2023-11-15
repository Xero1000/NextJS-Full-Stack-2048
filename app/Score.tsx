import React from 'react'

interface Props {
    score: number
}

const Score = ({ score }: Props) => {
  return (
    <div>Score: { score }</div>
  )
}

export default Score