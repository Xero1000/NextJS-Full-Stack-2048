import { Button, Flex } from '@radix-ui/themes'
import Image from 'next/image'
import GameBoard from './GameBoard'

export default function Home() {
  return (
    <Flex justify="center" align="center" className="h-screen">
      <GameBoard />
    </Flex>
  )
}
