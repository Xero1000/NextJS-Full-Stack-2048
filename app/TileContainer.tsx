import { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

// Spaces in the 4x4 board that can either be empty or have a tile.
const TileContainer = ({children}: Props) => {
  return (
    <div className="border-2 border-black relative">
        {children}
    </div>
  )
}

export default TileContainer