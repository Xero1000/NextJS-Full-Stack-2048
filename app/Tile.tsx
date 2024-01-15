import styles from "./Tile.module.css";
import colorMap from "./constants/colorMap";

interface Props {
  value: number;
}

const Tile = ({ value }: Props) => {
  return (
    <div
      className={`flex absolute justify-center items-center w-full h-full top-0 ${colorMap[value]} ${
        value === 512 || value === 2048 ? "text-white" : "text-black"
      } ${styles.tile}`}
    >
      {value}
    </div>
  );
};

export default Tile;


