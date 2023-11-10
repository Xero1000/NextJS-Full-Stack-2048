import { Box } from '@radix-ui/themes';
import { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

const TileContainer = ({children}: Props) => {
  return (
    <Box className="border-2 border-black relative" width="100%" height="100%">
        {children}
    </Box>
  )
}

export default TileContainer