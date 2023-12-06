import { Flex } from "@radix-ui/themes";
import styles from "./Tile.module.css";
import colorMap from "./constants/colorMap";

interface Props {
  value: number;
}

const Tile = ({ value }: Props) => {
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
