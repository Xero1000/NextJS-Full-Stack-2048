import { Flex } from "@radix-ui/themes";
import { useContext, useEffect } from "react";
import styles from "./Tile.module.css";
import colorMap from "./constants/colorMap";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";

interface Props {
  value: number;
  onWin: () => void
}

const Tile = ({ value, onWin }: Props) => {
  const { setIsModalOpen } = useContext(isModalOpenContext)

  // useEffect to prevent the update of win inside GameBoard while
  // attempting to render Tile during the render phase
  useEffect(() => {
    if (value === 2048) {
      onWin()
      setIsModalOpen(true)
    }
  }, [value])

  return (
    <Flex
      className={`absolute z-10 top-0 ${colorMap[value]} ${
        value === 512 || value === 2048 ? "text-white" : "text-black"
      } ${styles.tile}`}
      justify="center"
      align="center"
      width="100%"
      height="100%"
    >
      {value}
    </Flex>
  );
};

export default Tile;
