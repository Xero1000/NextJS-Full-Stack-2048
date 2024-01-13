import { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

const TileContainer = ({children}: Props) => {
  return (
    <div className="border-2 border-black relative">
        {children}
    </div>
  )
}

export default TileContainer