import { Flex } from '@radix-ui/themes'
import React from 'react'
import styles from './Tile.module.css'

interface Props {
    value: number
    position: [number, number]
    zIndex: number
}

const Tile = ({value, position, zIndex}: Props) => {
  return (
    <Flex className={`border-2 border-black absolute z-10 top-0 ${styles.tile}`} justify="center" align="center" width="100%" height="100%">
        {value}
    </Flex>
  )
}

export default Tile